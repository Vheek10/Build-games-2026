/** @format */

"use client";

import { useState, useEffect, Suspense } from "react";
import { 
  Upload, 
  Home, 
  Building2,
  Loader2,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { keccak256, encodePacked } from "viem";
import { useTokenization } from "@/hooks/useTokenization";
import { useRouter, useSearchParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";

function MintForm() {
  const { address, isConnected } = useAccount();
  const { tokenizeProperty, loading: isMinting, error: mintError } = useTokenization();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  
  const { data: receipt, isLoading: isWaitingReceipt } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    valuation: "",
    description: "",
    propertyType: "residential",
  });

  // Effect to pre-fill form from query parameters
  useEffect(() => {
    const title = searchParams.get("title");
    const location = searchParams.get("location");
    const valuation = searchParams.get("valuation");
    const description = searchParams.get("description");
    const type = searchParams.get("type");

    if (title || location || valuation || description || type) {
      setFormData({
        title: title || "",
        location: location || "",
        valuation: valuation || "",
        description: description || "",
        propertyType: type || "residential",
      });
    }
  }, [searchParams]);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(prev => [...prev, ...files.slice(0, 5 - prev.length)]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
        alert("Please connect your wallet first");
        return;
    }

    if (!formData.title || !formData.location || !formData.valuation) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // 1. Generate Metadata (Simulated IPFS Upload)
      const metadata = {
        name: formData.title,
        description: formData.description,
        location: formData.location,
        type: formData.propertyType,
        valuation: formData.valuation,
        timestamp: new Date().toISOString(),
        files: selectedFiles.map(f => f.name) // In prod, this would be IPFS hashes
      };

      // Encode metadata as Data URI for immediate availability
      const metadataURI = `data:application/json;base64,${btoa(JSON.stringify(metadata))}`;
      
      // 2. Generate Property ID & Private Commitment (ZK-ready hash anchor)
      const propertyId = `PROP-${Date.now()}`;
      
      // Simulate creating a ZK Commitment for private files/data
      const privateDataString = JSON.stringify({
        valuation: formData.valuation,
        files: selectedFiles.map(f => f.name + f.size),
        salt: propertyId // In real zk, this would be a high-entropy secret
      });
      const privateCommitment = keccak256(encodePacked(["string"], [privateDataString]));

      console.log("Minting Deed with ZK Privacy:", { propertyId, privateCommitment });

      // 3. Call Contract
      const { hash, success } = await tokenizeProperty(
        propertyId,
        metadataURI,
        "0", // Minting fee
        privateCommitment
      );

      if (success && hash) {
        setTxHash(hash);
      } else {
        throw new Error("Transaction failed to initiate");
      }
      
    } catch (error: any) {
      console.error("Mint Error:", error);
      alert(`Error: ${error.message || "Failed to mint property deed"}`);
    }
  };
  
  // Effect to handle success
  useEffect(() => {
      if (receipt && receipt.status === "success") {
          // Success Feedback
          const shouldView = confirm(`✅ Property Deed Minted!\n\nTransaction: ${receipt.transactionHash.slice(0,10)}...\n\nView in Dashboard?`);
          
          if (shouldView) {
            router.push("/dashboard");
          } else {
            // Reset form
            setTxHash(undefined);
            setFormData({
              title: "",
              location: "",
              valuation: "",
              description: "",
              propertyType: "residential",
            });
            setSelectedFiles([]);
          }
      }
  }, [receipt, router]);

  const isProcessing = isMinting || isWaitingReceipt;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Simple Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4 ring-1 ring-blue-100 dark:ring-blue-800">
            <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              PROPERTY REGISTRATION
            </span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            Mint Property Deed
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Create a unique, on-chain digital deed representing your real estate asset.
          </p>
        </div>

        {/* Global Error Alert */}
        {mintError && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 text-red-700 dark:text-red-400">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{mintError}</p>
          </div>
        )}

        {/* Main Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300">
          
          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="space-y-8">
              
              {/* Context Block */}
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                    <Home className="w-5 h-5 text-blue-500" />
                    Property Information
                 </h3>
                 <p className="text-sm text-gray-600 dark:text-gray-400">
                    This information will be embedded in the NFT metadata. Ensure all details are accurate as the blockchain record is immutable.
                 </p>
              </div>

              {/* Property Details Inputs */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="e.g. Sunset Villa"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="e.g. 123 Ocean Dr, Miami, FL"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Valuation (ETH) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="valuation"
                    value={formData.valuation}
                    onChange={handleInputChange}
                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="e.g. 150.5"
                    type="number"
                    step="0.0001"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Initial estimated value of the property in ETH.
                  </p>
                </div>

                <div className="space-y-2">
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="land">Land</option>
                    <option value="mixed-use">Mixed-Use</option>
                  </select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px] resize-y placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Describe main features, amenities, and unique selling points..."
                    rows={4}
                  />
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Supporting Documents
                </label>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 group">
                  <div className="mx-auto w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-gray-900 dark:text-white font-medium mb-1">
                    Upload Property Deed & Photos
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                    Supported: PDF, JPG, PNG (Max 5 files)
                  </p>
                  
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => e.target.files && handleFileSelect(Array.from(e.target.files))}
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                  >
                    Browse Files
                  </label>
                </div>

                {/* Selected Files List */}
                {selectedFiles.length > 0 && (
                  <div className="grid gap-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                             <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            {(file.size / 1024).toFixed(0)} KB
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(index)}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          aria-label="Remove file"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  disabled={isProcessing || !isConnected}
                   className={`w-full px-6 py-4 text-white font-bold text-lg rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isProcessing || !isConnected 
                      ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-70" 
                      : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 hover:shadow-blue-500/25 hover:-translate-y-0.5"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      {isWaitingReceipt ? "Confirming on Mantle..." : "Initiating Transaction..."}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6" />
                      Mint Property Deed
                    </>
                  )}
                </button>
                
                {!isConnected && (
                    <p className="text-center text-sm text-red-500 mt-3 font-medium">
                        Wallet not connected. Please connect via the navigation bar.
                    </p>
                )}
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center px-4">
                  By minting, you agree to the StrataDeed Terms of Service. A gas fee (ETH) will be required to execute this transaction on the Mantle Network.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function MintPage() {
  return (
    <AuthGuard>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      }>
        <MintForm />
      </Suspense>
    </AuthGuard>
  );
}
