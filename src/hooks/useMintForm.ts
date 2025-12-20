import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { keccak256, encodePacked } from "viem";
import { useTokenization } from "@/hooks/useTokenization";
import { useStrataDeed } from "@/hooks/useStrataDeed";
import { MintFormData, MintStep } from "@/types/mint";

export function useMintForm() {
  const { address } = useAccount();
  const { tokenizeProperty, loading: isMinting, error: mintError } = useTokenization();
  const { deployStrataDeed, isDeploying } = useStrataDeed();
  const chainId = useChainId();
  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [rwaTxHash, setRwaTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<MintStep>("idle");
  
  const [formData, setFormData] = useState<MintFormData>({
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

    // Network Validation
    if (chainId !== 5003) {
        setSubmitError("Please switch your network to Mantle Sepolia (5003) to mint property deeds.");
        return;
    }

    if (!formData.title || !formData.location || !formData.valuation) {
      setSubmitError("Please fill in all required fields (Title, Location, Valuation)");
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

      // Robust Base64 encoding for UTF-8 compatibility
      const metadataJSON = JSON.stringify(metadata);
      const metadataURI = `data:application/json;base64,${btoa(encodeURIComponent(metadataJSON).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))))}`;
      
      // 2. Generate Property ID & Private Commitment
      const propertyId = `PROP-${Date.now()}`;
      
      // Simulate creating a ZK Commitment
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

      if (result.success && result.hash) {
        setTxHash(result.hash);
        
        // If tokenization is disabled, we're done after this receipt
        if (!formData.tokenizationEnabled) {
          return;
        }

        // 4. If enabled, we proceed to RWA Deployment
        setCurrentStep("tokenizing");
        const rwaHash = await deployStrataDeed(
            formData.targetRaise,
            address!,
            [] // Additional admins
        );

        if (rwaHash) {
            setRwaTxHash(rwaHash);
        }
      } else {
        throw new Error(mintError || "Transaction failed to initiate. Please check your wallet connection or balance.");
      }
      
    } catch (error: any) {
      console.error("Mint Error:", error);
      setSubmitError(error.message || "Failed to mint property deed");
      setCurrentStep("idle");
    }
  };

  const resetForm = () => {
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
  };

  const isProcessing = isMinting || isDeploying || currentStep !== "idle";

  return {
    formData,
    selectedFiles,
    txHash,
    rwaTxHash,
    submitError,
    mintError,
    currentStep,
    isProcessing,
    setFormData,
    setSelectedFiles,
    handleSubmit,
    handleInputChange,
    handleFileSelect,
    handleRemoveFile,
    setSubmitError,
    resetForm
  };
}