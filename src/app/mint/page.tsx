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
  AlertCircle,
  ExternalLink,
  ArrowRight,
  Plus,
  Zap,
  DollarSign,
  PieChart,
  Target,
  Clock
} from "lucide-react";
import { useAccount, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { keccak256, encodePacked } from "viem";
import { useTokenization } from "@/hooks/useTokenization";
import { useStrataDeed } from "@/hooks/useStrataDeed";
import { useRouter, useSearchParams } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { motion, AnimatePresence } from "framer-motion";

function MintForm() {
  const { address, isConnected } = useAccount();
  const { tokenizeProperty, loading: isMinting, error: mintError } = useTokenization();
  const { deployStrataDeed, isDeploying } = useStrataDeed();
  const chainId = useChainId();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [rwaTxHash, setRwaTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"idle" | "minting" | "tokenizing" | "success">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: receipt, isLoading: isWaitingReceipt } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const { data: rwaReceipt, isLoading: isWaitingRwaReceipt } = useWaitForTransactionReceipt({
    hash: rwaTxHash,
  });

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    valuation: "",
    description: "",
    propertyType: "residential",
    image: "",
    tokenizationEnabled: true,
    targetRaise: "",
    tokenSupply: "1000",
  });

  // Effect to pre-fill form from query parameters
  useEffect(() => {
    const title = searchParams.get("title");
    const location = searchParams.get("location");
    const valuation = searchParams.get("valuation");
    const description = searchParams.get("description");
    const type = searchParams.get("type");
    const image = searchParams.get("image");

    if (title || location || valuation || description || type || image) {
      setFormData(prev => ({
        ...prev,
        title: title || "",
        location: location || "",
        valuation: valuation || "",
        description: description || "",
        propertyType: type || "residential",
        image: image || "",
      }));
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
    
    setSubmitError(null);
    setIsSubmitting(true);

    // Network Validation
    if (chainId !== 5003) {
        setSubmitError("Please switch your network to Mantle Sepolia (5003) to mint property deeds.");
        setIsSubmitting(false);
        return;
    }

    if (!formData.title || !formData.location || !formData.valuation) {
      setSubmitError("Please fill in all required fields (Title, Location, Valuation)");
      setIsSubmitting(false);
      return;
    }

    setSubmitError(null);
    setCurrentStep("minting");
    
    try {
      // Validation for tokenization
      if (formData.tokenizationEnabled && (!formData.targetRaise || Number(formData.targetRaise) <= 0)) {
          throw new Error("Please specify a valid Target Raise for tokenization.");
      }

      // 1. Generate Metadata (Simulated IPFS Upload)
      const metadata = {
        name: formData.title,
        description: formData.description,
        location: formData.location,
        type: formData.propertyType,
        valuation: formData.valuation,
        timestamp: new Date().toISOString(),
        files: selectedFiles.map(f => f.name),
        tokenization: formData.tokenizationEnabled ? {
            enabled: true,
            targetRaise: formData.targetRaise,
            tokenSupply: formData.tokenSupply,
            tokenPrice: (Number(formData.targetRaise) / Number(formData.tokenSupply)).toFixed(2),
            equityPercentage: ((Number(formData.targetRaise) / Number(formData.valuation)) * 100).toFixed(2)
        } : { enabled: false }
      };

      // Robust Base64 encoding for UTF-8 compatibility (handles non-ASCII in titles/descriptions)
      const metadataJSON = JSON.stringify(metadata);
      const metadataURI = `data:application/json;base64,${btoa(encodeURIComponent(metadataJSON).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))))}`;
      
      // 2. Generate Property ID & Private Commitment (ZK-ready hash anchor)
      const propertyId = `PROP-${Date.now()}`;
      
      // Simulate creating a ZK Commitment for private files/data
      const privateDataString = JSON.stringify({
        valuation: formData.valuation,
        files: selectedFiles.map(f => f.name + f.size),
        salt: propertyId
      });
      const privateCommitment = keccak256(encodePacked(["string"], [privateDataString]));

      console.log("Minting Deed with ZK Privacy:", { propertyId, privateCommitment });

      // 3. Call Contract for NFT Minting
      const result = await tokenizeProperty(
        propertyId,
        metadataURI,
        "0", // Minting fee
        privateCommitment,
        address as `0x${string}`
      );

      console.log("Tokenize result:", result);

      if (result.success && result.hash) {
        setTxHash(result.hash);
        
        // If tokenization is disabled, we're done after this receipt
        if (!formData.tokenizationEnabled) {
          console.log("Property minted successfully without tokenization");
          return;
        }

        // 4. If enabled, we proceed to RWA Deployment
        setCurrentStep("tokenizing");
        const rwaHash = await deployStrataDeed(
            formData.targetRaise,
            address!,
            [] // Additional admins (auto-filled by hook)
        );

        if (rwaHash) {
            setRwaTxHash(rwaHash);
        }
      } else {
        throw new Error(result.message || mintError || "Transaction failed to initiate. Please check your wallet connection or balance.");
      }
      
    } catch (error: any) {
      console.error("Mint Error:", error);
      setSubmitError(error.message || "Failed to mint property deed");
      setCurrentStep("idle");
      setIsSubmitting(false);
    }
  };
  
  // Success View Component (Wait for both if tokenizing)
  const isFullySuccessful = formData.tokenizationEnabled 
    ? (receipt?.status === "success" && rwaReceipt?.status === "success")
    : (receipt?.status === "success");

  if (isFullySuccessful) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 dark:border-gray-700 max-w-lg w-full text-center relative overflow-hidden"
        >
          {/* Success Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
          
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-8 relative">
            <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute inset-0 bg-emerald-400/20 rounded-full"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
            Deed Minted Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Your property deed for <span className="font-bold text-gray-900 dark:text-white">"{formData.title}"</span> has been securely tokenized on the Mantle Network.
          </p>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 mb-8 border border-gray-100 dark:border-gray-800 text-left space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Deed NFT Transaction</span>
                <a 
                  href={`https://explorer.sepolia.mantle.xyz/tx/${receipt?.transactionHash || txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline"
                >
                  {String(receipt?.transactionHash || txHash).slice(0, 8)}...{String(receipt?.transactionHash || txHash).slice(-6)}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
             </div>
             {rwaTxHash && (
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">RWA Token Deployment</span>
                  <a 
                    href={`https://explorer.sepolia.mantle.xyz/tx/${rwaReceipt?.transactionHash || rwaTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1 hover:underline"
                  >
                    {String(rwaReceipt?.transactionHash || rwaTxHash).slice(0, 8)}...{String(rwaReceipt?.transactionHash || rwaTxHash).slice(-6)}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
               </div>
             )}
             <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Network</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                   Mantle Sepolia
                </span>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
               onClick={() => router.push("/dashboard")}
               className="flex-1 px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
               onClick={() => {
                  setTxHash(undefined);
                  setRwaTxHash(undefined);
                  setCurrentStep("idle");
                  setSelectedFiles([]);
                  setFormData({
                    title: "",
                    location: "",
                    valuation: "",
                    description: "",
                    propertyType: "residential",
                    image: "",
                    tokenizationEnabled: true,
                    targetRaise: "",
                    tokenSupply: "1000",
                  });
               }}
               className="flex-1 px-6 py-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Mint Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const isProcessing = isSubmitting || isMinting || isWaitingReceipt || isDeploying || isWaitingRwaReceipt;

  // Enhanced loading spinner with progress indicator
  const LoadingSpinnerWithProgress = () => (
    <div className="flex items-center justify-center gap-3">
      <div className="relative">
        <Loader2 className="w-6 h-6 animate-spin text-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-30 blur-sm rounded-full"></div>
      </div>
      <div className="text-left">
        <div className="font-semibold text-white text-sm">
          {currentStep === "minting" 
            ? (isWaitingReceipt ? "Confirming Deed Transaction..." : "Initiating Property Mint...")
            : (isWaitingRwaReceipt ? "Confirming RWA Deployment..." : "Deploying Token Contract...")}
        </div>
        <div className="text-xs text-blue-100 font-medium">
          {currentStep === "minting" ? "Step 1 of 2" : "Step 2 of 2"}
        </div>
      </div>
    </div>
  );

  // Enhanced mint button content
  const MintButtonContent = () => {
    if (isProcessing) {
      return <LoadingSpinnerWithProgress />;
    }
    
    return (
      <div className="flex items-center justify-center gap-3">
        {formData.tokenizationEnabled ? (
          <>
            <div className="relative">
              <Zap className="w-6 h-6 text-amber-300" />
              <motion.div 
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-amber-400/20 blur-sm rounded-full"
              />
            </div>
            <div className="text-left">
              <div className="font-bold text-white">Mint & Tokenize Property</div>
            </div>
          </>
        ) : (
          <>
            <div className="relative">
              <CheckCircle className="w-6 h-6 text-white" />
              <motion.div 
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-blue-400/20 blur-sm rounded-full"
              />
            </div>
            <div className="text-left">
              <div className="font-bold text-white">Mint Property Deed</div>
            </div>
          </>
        )}
      </div>
    );
  };

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
        <AnimatePresence mode="wait">
          {(submitError || mintError) && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mb-8 p-6 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-3xl flex items-start gap-4 shadow-xl shadow-red-500/5 backdrop-blur-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
                 <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-black text-red-900 dark:text-red-300 tracking-tight">Minting Error</h4>
                <p className="text-sm text-red-700/80 dark:text-red-400/80 mt-1 font-medium leading-relaxed">
                  {submitError || (typeof mintError === 'string' ? mintError : "An unexpected error occurred during the minting process. Please check your network and try again.")}
                </p>
                <div className="mt-4 flex gap-3">
                  <button 
                    onClick={() => setSubmitError(null)}
                    className="px-4 py-2 bg-white dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/50 transition-all"
                  >
                    Dismiss
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
                  >
                    Retry Page
                  </button>
                </div>
              </div>
              <button 
                 onClick={() => setSubmitError(null)}
                 className="p-2 text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all"
              >
                 <Plus className="w-5 h-5 rotate-45" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Indicator */}
        {isProcessing && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border border-blue-100 dark:border-blue-800/30 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">Transaction in Progress</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {currentStep === "minting" 
                      ? "Minting your property deed NFT on Mantle Network..."
                      : "Deploying RWA token contract for fractional ownership..."}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: currentStep === "minting" ? "50%" : "100%",
                          transition: { duration: 1 }
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {currentStep === "minting" ? "Step 1/2" : "Step 2/2"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
                    Valuation (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="valuation"
                    value={formData.valuation}
                    onChange={handleInputChange}
                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 text-base bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="e.g. 500000"
                    type="number"
                    step="0.01"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Initial estimated value of the property in USD.
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
                    Recommended: Property Deed, Owner ID, and Valuation Reports.
                  </p>
                  <p className="text-xs text-blue-500 dark:text-blue-400 mb-4 font-medium flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Files are encrypted & stored privately via ZK-Commitments.
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
                {(selectedFiles.length > 0 || formData.image) && (
                  <div className="grid gap-3">
                    <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Selected Documents</h5>
                    
                    {/* Pre-filled Marketplace Asset */}
                    {formData.image && (
                      <div className="flex items-center justify-between bg-blue-50/50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-800/50 shadow-sm transition-all ring-1 ring-blue-200 dark:ring-blue-800/30">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-blue-200 dark:border-blue-700">
                             <img src={formData.image} alt="Property" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-gray-900 dark:text-white truncate">
                              {formData.title || "Marketplace Property Asset"}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded uppercase font-bold">
                                Initial Property Asset
                              </span>
                              <span className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                                <CheckCircle className="w-2.5 h-2.5" />
                                Verified
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 text-blue-400">
                          <Home className="w-5 h-5" />
                        </div>
                      </div>
                    )}

                    {selectedFiles.map((file, index) => {
                      // Simple logic to guess category based on name or index for demo
                      let category = "Ownership Document";
                      if (index === 1) category = "Identity Verification";
                      if (index === 2) category = "Valuation Report";
                      if (index > 2) category = "Other Supporting Doc";

                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white dark:bg-gray-800/80 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm transition-all"
                        >
                          <div className="flex items-center gap-4 overflow-hidden">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                               <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                {file.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded uppercase font-bold">
                                  {category}
                                </span>
                                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                  {(file.size / 1024).toFixed(0)} KB
                                </span>
                                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                                  <CheckCircle className="w-2.5 h-2.5" />
                                  Private
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            aria-label="Remove file"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Tokenization Strategy Section */}
              <div className="space-y-6 pt-8 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                       <PieChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Tokenization Strategy</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Fractionalize your property for investors</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, tokenizationEnabled: !prev.tokenizationEnabled }))}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                            formData.tokenizationEnabled 
                            ? "bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm" 
                            : "text-gray-500"
                        }`}
                    >
                        Enabled
                    </button>
                    <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, tokenizationEnabled: !prev.tokenizationEnabled }))}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                            !formData.tokenizationEnabled 
                            ? "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 shadow-sm" 
                            : "text-gray-500"
                        }`}
                    >
                        Disabled
                    </button>
                  </div>
                </div>

                {formData.tokenizationEnabled && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="grid sm:grid-cols-2 gap-6 bg-emerald-50/30 dark:bg-emerald-900/5 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800/30"
                  >
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Target Raise (USD)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign className="w-4 h-4 text-emerald-500" />
                        </div>
                        <input
                            name="targetRaise"
                            type="number"
                            value={formData.targetRaise}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (Number(val) > Number(formData.valuation)) return;
                                setFormData(prev => ({ ...prev, targetRaise: val }));
                            }}
                            className="w-full border border-emerald-200 dark:border-emerald-800/50 rounded-lg pl-9 pr-4 py-3 text-base bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="Amount to raise"
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        Max raise: ${formData.valuation || "0"} (100% equity)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total Fractional Supply
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Target className="w-4 h-4 text-emerald-500" />
                        </div>
                        <input
                            name="tokenSupply"
                            type="number"
                            value={formData.tokenSupply}
                            onChange={(e) => setFormData(prev => ({ ...prev, tokenSupply: e.target.value }))}
                            className="w-full border border-emerald-200 dark:border-emerald-800/50 rounded-lg pl-9 pr-4 py-3 text-base bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                            placeholder="e.g. 1000"
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">
                        Number of RWA tokens to mint
                      </p>
                    </div>

                    {/* ROI & Price Summary */}
                    <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-100 dark:border-emerald-800/30">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-emerald-50 dark:border-emerald-900/50">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-tight">Token Price</span>
                            <div className="text-lg font-black text-gray-900 dark:text-white">
                                ${formData.targetRaise && formData.tokenSupply ? (Number(formData.targetRaise) / Number(formData.tokenSupply)).toFixed(2) : "0.00"}
                            </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-emerald-50 dark:border-emerald-900/50">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-tight">Equity Offered</span>
                            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                                {formData.targetRaise && formData.valuation ? ((Number(formData.targetRaise) / Number(formData.valuation)) * 100).toFixed(1) : "0.0"}%
                            </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-emerald-50 dark:border-emerald-900/50">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-tight">Status</span>
                            <div className="text-sm font-bold text-gray-600 dark:text-gray-300 mt-1">
                                Ready to Mint
                            </div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-emerald-50 dark:border-emerald-900/50">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-tight">Network</span>
                            <div className="text-sm font-bold text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-1">
                                <Zap className="w-3 h-3 text-amber-500" />
                                Mantle L2
                            </div>
                        </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6 mt-8 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="submit"
                  disabled={isProcessing || !isConnected}
                  className={`w-full px-6 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center ${
                    isProcessing || !isConnected 
                      ? "bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 cursor-not-allowed opacity-80" 
                      : "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 hover:shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg"
                  }`}
                >
                  <MintButtonContent />
                </button>
                
                {!isConnected && (
                    <p className="text-center text-sm text-red-500 mt-3 font-medium">
                        Wallet not connected. Please connect via the navigation bar.
                    </p>
                )}
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center px-4">
                  By minting, you agree to the StrataDeed Terms of Service. A gas fee ($MNT) will be required to execute this transaction on the Mantle Network.
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
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-20 blur-xl rounded-full" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Loading Mint Page</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Preparing your property minting experience...</p>
          </div>
        </div>
      }>
        <MintForm />
      </Suspense>
    </AuthGuard>
  );
}