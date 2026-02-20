/** @format */

"use client";

import { useState, useEffect, Suspense, useMemo, useCallback } from "react";
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
	Clock,
	Globe,
	Shield,
} from "lucide-react";
// Simple hash function for file commitments (using Web Crypto API for SHA-256)
async function hashString(str: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(str);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return "0x" + hashHex.slice(0, 64);
}

// Simple async wrapper for hash calls
const keccak256 = async (str: string): Promise<string> => {
	return hashString(str);
};
import { useTokenization } from "@/hooks/useTokenization";
import { useStrataDeed } from "@/hooks/useStrataDeed";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { saveProperty, getNextPropertyId } from "@/lib/propertyStorage";
import { sampleProperties } from "@/lib/dummy-data";
import type { Property } from "@/lib/dummy-data";
import { useAccount } from "wagmi";

// Error Boundary Component
function withErrorBoundary(WrappedComponent: React.ComponentType) {
	return function ErrorBoundaryWrapper(props: any) {
		const [hasError, setHasError] = useState(false);
		const [error, setError] = useState<Error | null>(null);

		useEffect(() => {
			const handleError = (err: ErrorEvent) => {
				setHasError(true);
				setError(err.error);
			};

			window.addEventListener("error", handleError);
			return () => window.removeEventListener("error", handleError);
		}, []);

		if (hasError && error) {
			return (
				<div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white p-4">
					<div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
						<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<AlertCircle className="w-8 h-8 text-red-600" />
						</div>
						<h2 className="text-2xl font-bold text-gray-900 text-center mb our-2">
							Something went wrong
						</h2>
						<p className="text-gray-600 text-center mb-6">
							An error occurred while loading the minting form.
						</p>
						<div className="bg-red-50 rounded-xl p-4 mb-6">
							<p className="text-sm text-red-700 font-mono break-all">
								{error.message}
							</p>
						</div>
						<div className="flex gap-3">
							<button
								onClick={() => {
									setHasError(false);
									setError(null);
								}}
								className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
								Try Again
							</button>
							<button
								onClick={() => (window.location.href = "/dashboard")}
								className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
								Go to Dashboard
							</button>
						</div>
					</div>
				</div>
			);
		}

		return <WrappedComponent {...props} />;
	};
}

// Main Form Component - Completely standalone
function MintFormContent() {
	const { address, isConnected: connected } = useAccount();
	const {
		tokenizeProperty,
		loading: isMinting,
		error: mintError,
	} = useTokenization();
	const { deployStrataDeed, isDeploying } = useStrataDeed();

	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [txHash, setTxHash] = useState<string | undefined>(undefined);
	const [rwaTxHash, setRwaTxHash] = useState<string | undefined>(undefined);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});
	const [currentStep, setCurrentStep] = useState<
		"idle" | "minting" | "tokenizing" | "success"
	>("idle");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isWaitingReceipt = false;
	const rwaReceipt = undefined;
	const isWaitingRwaReceipt = false;

	// Completely standalone form data - no property card data
	const [formData, setFormData] = useState({
		title: "",
		location: "",
		valuation: "",
		description: "",
		propertyType: "residential",
		tokenizationEnabled: true,
		targetRaise: "",
		tokenSupply: "1000",
	});

	// Real-time network validation - check wallet connection
	useEffect(() => {
		if (!connected) {
			setSubmitError("Please connect your wallet to mint property deeds.");
		} else {
			setSubmitError(null);
		}
	}, [connected]);

	// Enhanced file validation
	const validateFile = (file: File): string | null => {
		const validTypes = [
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/webp",
			"application/pdf",
		];
		const maxSize = 5 * 1024 * 1024; // 5MB

		if (!validTypes.includes(file.type)) {
			return `Invalid file type: ${file.name}. Only images (JPEG, PNG, GIF, WebP) and PDFs allowed.`;
		}

		if (file.size > maxSize) {
			return `File too large: ${file.name}. Maximum size is 5MB.`;
		}

		return null;
	};

	const handleFileSelect = useCallback(
		(files: File[]) => {
			const errors: string[] = [];
			const validFiles: File[] = [];

			files.slice(0, 5 - selectedFiles.length).forEach((file) => {
				const error = validateFile(file);
				if (error) {
					errors.push(error);
				} else {
					validFiles.push(file);
				}
			});

			if (errors.length > 0) {
				setSubmitError(errors.join(" "));
			}

			if (validFiles.length > 0) {
				setSelectedFiles((prev) => [...prev, ...validFiles]);
			}
		},
		[selectedFiles.length],
	);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		// Clear error for this field when user starts typing
		if (formErrors[name]) {
			setFormErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const handleRemoveFile = (index: number) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
	};

	// Real-time form validation
	const validateForm = useCallback((): boolean => {
		const errors: Record<string, string> = {};

		if (!formData.title.trim()) errors.title = "Property title is required";
		if (!formData.location.trim()) errors.location = "Location is required";

		const valuation = Number(formData.valuation);
		if (!formData.valuation || isNaN(valuation) || valuation <= 0) {
			errors.valuation = "Valid valuation amount is required";
		}

		if (formData.tokenizationEnabled) {
			const targetRaise = Number(formData.targetRaise);
			if (!formData.targetRaise || isNaN(targetRaise) || targetRaise <= 0) {
				errors.targetRaise = "Target raise amount is required";
			} else if (targetRaise > valuation) {
				errors.targetRaise = "Cannot raise more than property valuation";
			}

			const tokenSupply = Number(formData.tokenSupply);
			if (!formData.tokenSupply || isNaN(tokenSupply) || tokenSupply <= 0) {
				errors.tokenSupply = "Valid token supply is required";
			}
		}

		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	}, [formData]);

	// Memoized token calculations
	const tokenDetails = useMemo(() => {
		if (!formData.tokenizationEnabled) return null;

		const targetRaise = Number(formData.targetRaise);
		const valuation = Number(formData.valuation);
		const tokenSupply = Number(formData.tokenSupply);

		if (
			!targetRaise ||
			!valuation ||
			!tokenSupply ||
			targetRaise <= 0 ||
			valuation <= 0 ||
			tokenSupply <= 0
		) {
			return null;
		}

		return {
			price: (targetRaise / tokenSupply).toFixed(2),
			equity: ((targetRaise / valuation) * 100).toFixed(1),
			tokensPerPercent: (
				tokenSupply /
				((targetRaise / valuation) * 100)
			).toFixed(0),
		};
	}, [
		formData.tokenizationEnabled,
		formData.targetRaise,
		formData.valuation,
		formData.tokenSupply,
	]);

	// Enhanced Base64 encoding for UTF-8
	const encodeMetadataToBase64 = useCallback((metadata: any): string => {
		try {
			const metadataJSON = JSON.stringify(metadata);
			const encoder = new TextEncoder();
			const data = encoder.encode(metadataJSON);
			const base64 = btoa(String.fromCharCode(...data));
			return `data:application/json;base64,${base64}`;
		} catch (error) {
			const metadataJSON = JSON.stringify(metadata);
			const uriEncoded = encodeURIComponent(metadataJSON);
			const base64 = btoa(uriEncoded);
			return `data:application/json;base64,${base64}`;
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		setSubmitError(null);

		// Validate form
		if (!validateForm()) {
			setSubmitError("Please fix the errors in the form.");
			return;
		}

		if (!connected || !address) {
			setSubmitError("Wallet not connected. Please connect your wallet.");
			return;
		}

		setIsSubmitting(true);
		setCurrentStep("minting");

		try {
			// Generate Metadata
			const metadata = {
				name: formData.title,
				description: formData.description,
				location: formData.location,
				type: formData.propertyType,
				valuation: formData.valuation,
				timestamp: new Date().toISOString(),
				files: selectedFiles.map((f) => ({
					name: f.name,
					size: f.size,
					type: f.type,
					lastModified: f.lastModified,
				})),
				tokenization: formData.tokenizationEnabled
					? {
							enabled: true,
							targetRaise: formData.targetRaise,
							tokenSupply: formData.tokenSupply,
							tokenPrice: tokenDetails?.price || "0",
							equityPercentage: tokenDetails?.equity || "0",
							owner: address,
						}
					: { enabled: false },
			};

			// Encode metadata
			const metadataURI = encodeMetadataToBase64(metadata);

			// Generate Secure Property ID using Web Crypto API
			const generateSecurePropertyId = (): string => {
				const timestamp = Date.now();
				const randomBytes = new Uint8Array(16);
				crypto.getRandomValues(randomBytes);
				const randomHex = Array.from(randomBytes)
					.map((b) => b.toString(16).padStart(2, "0"))
					.join("");
				return `PROP-${timestamp}-${randomHex}`;
			};

			const propertyId = generateSecurePropertyId();

			// Create ZK Commitment
			const fileHashes = await Promise.all(
				selectedFiles.map((f) => keccak256(f.name + f.size + f.lastModified)),
			);
			const privateDataString = JSON.stringify({
				valuation: formData.valuation,
				files: selectedFiles.map((f, i) => ({
					name: f.name,
					hash: fileHashes[i],
				})),
				salt: propertyId,
				timestamp: Date.now(),
			});
			const privateCommitment = await keccak256(privateDataString);

			// Call Contract for NFT Minting (property_nft::mint_property_deed)
			const result = await tokenizeProperty(
				propertyId,
				metadataURI,
				"0",
				privateCommitment,
				address,
			);

			if (result.success && result.hash) {
				setTxHash(result.hash);

				// If tokenization is disabled, we're done after this receipt
				if (!formData.tokenizationEnabled) {
					return;
				}

				// If enabled, proceed to RWA Deployment
				setCurrentStep("tokenizing");

				try {
					const rwaHash = await deployStrataDeed(
						formData.targetRaise,
						address!,
					);

					if (rwaHash) {
						setRwaTxHash(rwaHash);
					}
				} catch (rwaError: any) {
					// Handle RWA deployment error
				}
			} else {
				throw new Error(
					result.message ||
						mintError ||
						"Transaction failed to initiate. Please check your wallet connection or balance.",
				);
			}
		} catch (error: any) {
			setSubmitError(error.message || "Failed to mint property deed");
			setCurrentStep("idle");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Success View Component
	const isFullySuccessful = !!txHash;

	// Save property to localStorage when minting is successful
	useEffect(() => {
		if (isFullySuccessful && formData.title) {
			// Check if already saved to avoid duplicates
			const savedKey = `property_saved_${txHash}`;
			if (localStorage.getItem(savedKey)) {
				return;
			}

			// Create property object
			const newProperty: Property = {
				id: getNextPropertyId(sampleProperties),
				title: formData.title,
				description: formData.description || "Property minted via StrataDeed",
				location: formData.location,
				price: Number(formData.valuation),
				bedrooms: formData.propertyType === "residential" ? 3 : 0,
				bathrooms: formData.propertyType === "residential" ? 2 : 0,
				squareFeet: formData.propertyType === "commercial" ? 5000 : 2000,
				capacity: formData.propertyType === "commercial" ? 20 : 6,
				views: 0,
				isFeatured: false,
				country: formData.location.split(",").pop()?.trim() || "Unknown",
				createdAt: new Date().toISOString().split("T")[0],
				type:
					formData.propertyType === "residential" ? "Apartments" : "Commercial",
				rating: undefined,
				investmentReturn: formData.tokenizationEnabled
					? Number(tokenDetails?.equity) || 8
					: undefined,
				image: "/images/unsplash-7fde63acd811.jpg", // Default placeholder
				isMinted: true,
				txHash: txHash,
				propertyType: formData.propertyType,
			};

			// Save to localStorage
			saveProperty(newProperty);
			localStorage.setItem(savedKey, "true");
		}
	}, [isFullySuccessful, formData, txHash, tokenDetails]);

	if (isFullySuccessful) {
		return (
			<div className="min-h-[80vh] flex items-center justify-center px-4">
				<motion.div
					initial={{ opacity: 0, scale: 0.9, y: 20 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-100 max-w-lg w-full text-center relative overflow-hidden">
					{/* Success Background Decoration */}
					<div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-emerald-400 to-teal-500" />

					<div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 relative">
						<CheckCircle className="w-10 h-10 text-emerald-600" />
					</div>

					<h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight font-mclaren">
						{formData.tokenizationEnabled
							? "Property Tokenized Successfully!"
							: "Deed Minted Successfully!"}
					</h2>
					<p className="text-gray-600 mb-8 font-montserrat">
						Your property deed for{" "}
						<span className="font-bold text-gray-900">"{formData.title}"</span>{" "}
						has been securely{" "}
						{formData.tokenizationEnabled ? "tokenized" : "minted"} on the
						Avalanche Network.
					</p>

					<div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 text-left space-y-4">
						<div className="flex justify-between items-center text-sm">
							<span className="text-gray-500">Deed Object Transaction</span>
							<a
								href={`https://testnet.snowtrace.io/tx/${txHash}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 font-medium flex items-center gap-1 hover:underline"
								aria-label="View deed transaction on explorer">
								{String(txHash).slice(0, 8)}...
								{String(txHash).slice(-6)}
								<ExternalLink className="w-3.5 h-3.5" />
							</a>
						</div>
						{rwaTxHash && (
							<div className="flex justify-between items-center text-sm">
								<span className="text-gray-500">RWA Token Deployment</span>
								<a
									href={`https://testnet.snowtrace.io/tx/${rwaTxHash}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 font-medium flex items-center gap-1 hover:underline"
									aria-label="View RWA deployment on explorer">
									{String(rwaTxHash).slice(0, 8)}...
									{String(rwaTxHash).slice(-6)}
									<ExternalLink className="w-3.5 h-3.5" />
								</a>
							</div>
						)}
						<div className="flex justify-between items-center text-sm">
							<span className="text-gray-500">Network</span>
							<span className="text-emerald-600 font-bold flex items-center gap-1">
								<div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
								Avalanche Fuji Testnet
							</span>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row gap-4">
						<Link
							href="/dashboard"
							className="flex-1 px-8 py-5 bg-gray-900 text-white rounded-full hover:bg-blue-600 transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 group"
							aria-label="Go to dashboard">
							<span className="text-[10px] font-black uppercase tracking-[0.4em] font-montserrat">
								Go to Dashboard
							</span>
							<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
						</Link>
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
									tokenizationEnabled: true,
									targetRaise: "",
									tokenSupply: "1000",
								});
							}}
							className="flex-1 px-8 py-5 bg-white text-gray-900 rounded-full border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.05)] hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3"
							aria-label="Mint another property deed">
							<Plus className="w-4 h-4" />
							<span className="text-[10px] font-black uppercase tracking-[0.4em] font-montserrat">
								Mint Another
							</span>
						</button>
					</div>
				</motion.div>
			</div>
		);
	}

	const isProcessing =
		isSubmitting ||
		isMinting ||
		isWaitingReceipt ||
		isDeploying ||
		isWaitingRwaReceipt;

	// Enhanced loading spinner with progress indicator
	const LoadingSpinnerWithProgress = () => (
		<div className="flex items-center justify-center gap-3">
			<div className="relative">
				<Loader2 className="w-6 h-6 animate-spin text-white" />
			</div>
			<div className="text-left">
				<div className="font-semibold text-white text-sm font-montserrat">
					{currentStep === "minting"
						? isWaitingReceipt
							? "Confirming Deed Transaction..."
							: "Initiating Property Mint..."
						: isWaitingRwaReceipt
							? "Confirming RWA Deployment..."
							: "Deploying Token Contract..."}
				</div>
				<div className="text-xs text-blue-100 font-medium font-montserrat">
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
						</div>
						<div className="text-left">
							<div className="font-bold text-white font-montserrat">
								Mint & Tokenize Property
							</div>
						</div>
					</>
				) : (
					<>
						<div className="relative">
							<CheckCircle className="w-6 h-6 text-white" />
						</div>
						<div className="text-left">
							<div className="font-bold text-white font-montserrat">
								Mint Property Deed
							</div>
						</div>
					</>
				)}
			</div>
		);
	};

	return (
		<motion.div
			className="min-h-screen bg-linear-to-b from-gray-50 to-white py-8 transition-colors duration-300"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}>
			<motion.div
				className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}>
				{/* Simple Header */}
				<motion.div
					className="text-center mb-10"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1, duration: 0.4 }}>
					<motion.div
						className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4 ring-1 ring-blue-100"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.15, duration: 0.3 }}>
						<Building2 className="w-4 h-4 text-blue-600" />
						<span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 font-montserrat">
							PROPERTY REGISTRATION
						</span>
					</motion.div>

					<motion.h1
						className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tight leading-[1.1] font-mclaren"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.4 }}>
						Mint Property Deed
					</motion.h1>

					<motion.p
						className="text-lg text-gray-600 max-w-2xl mx-auto font-medium font-montserrat leading-relaxed"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.25, duration: 0.4 }}>
						Create a unique, on-chain digital deed representing your real estate
						asset.
					</motion.p>
				</motion.div>
				{/* Network / Wallet Status Indicator */}
				<motion.div
					className="mb-8"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.4 }}>
					<motion.div
						className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
							connected
								? "bg-emerald-50 border border-emerald-100 shadow-sm shadow-emerald-100/50"
								: "bg-red-50 border border-red-100 shadow-sm shadow-red-100/50"
						}`}
						whileHover={{
							y: -2,
							boxShadow: connected
								? "0 12px 24px rgba(16,185,129,0.15)"
								: "0 12px 24px rgba(220,38,38,0.15)",
						}}
						transition={{ type: "spring", stiffness: 400 }}>
						<div
							className={`w-3 h-3 rounded-full ${
								connected ? "bg-emerald-500 animate-pulse" : "bg-red-500"
							}`}
						/>
						<div className="flex-1">
							<div className="font-semibold text-gray-900 font-montserrat">
								{connected
									? "Connected to Avalanche Fuji"
									: "Wallet Disconnected"}
							</div>
							<div className="text-sm text-gray-600 font-montserrat">
								{connected
									? "You can mint property deeds on Avalanche Fuji Testnet."
									: "Please connect your wallet to mint property deeds."}
							</div>
						</div>
						<Globe className="w-5 h-5 text-gray-400" />
					</motion.div>
				</motion.div>

				{/* Global Error Alert */}
				<AnimatePresence mode="wait">
					{(submitError || mintError) && (
						<motion.div
							initial={{ opacity: 0, y: -20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -20, scale: 0.95 }}
							className="mb-8 p-6 bg-red-50/50 border border-red-100 rounded-3xl flex items-start gap-4 shadow-xl shadow-red-500/5 backdrop-blur-sm"
							role="alert"
							aria-live="assertive">
							<div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
								<AlertCircle className="w-6 h-6 text-red-600" />
							</div>
							<div className="flex-1">
								<h4 className="text-lg font-black text-red-900 tracking-tight font-mclaren">
									Minting Error
								</h4>
								<p className="text-sm text-red-700/80 mt-1 font-medium leading-relaxed font-montserrat">
									{submitError ||
										(typeof mintError === "string"
											? mintError
											: "An unexpected error occurred during the minting process. Please check your network and try again.")}
								</p>
								<div className="mt-4 flex gap-3">
									<button
										onClick={() => setSubmitError(null)}
										className="px-4 py-2 bg-white text-red-600 text-xs font-bold rounded-lg border border-red-200 hover:bg-red-50 transition-all font-montserrat"
										aria-label="Dismiss error">
										Dismiss
									</button>
									<button
										onClick={() => window.location.reload()}
										className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 font-montserrat"
										aria-label="Retry page">
										Retry Page
									</button>
								</div>
							</div>
							<button
								onClick={() => setSubmitError(null)}
								className="p-2 text-red-400 hover:bg-red-100 rounded-xl transition-all"
								aria-label="Close error">
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
						className="mb-8">
						<div className="bg-linear-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
									<Clock className="w-6 h-6 text-blue-600" />
								</div>
								<div className="flex-1">
									<h4 className="font-bold text-gray-900 font-mclaren">
										Transaction in Progress
									</h4>
									<p className="text-sm text-gray-600 mt-1 font-montserrat">
										{currentStep === "minting"
											? "Minting your property deed on Avalanche..."
											: "Deploying RWA token for fractional ownership on Avalanche..."}
									</p>
									<div className="mt-3 flex items-center gap-3">
										<div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
											<motion.div
												className="h-full bg-linear-to-r from-blue-500 to-cyan-400"
												initial={{ width: "0%" }}
												animate={{
													width: currentStep === "minting" ? "50%" : "100%",
													transition: { duration: 1 },
												}}
											/>
										</div>
										<span className="text-xs font-bold text-blue-600 font-montserrat">
											{currentStep === "minting" ? "Step 1/2" : "Step 2/2"}
										</span>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				)}

				{/* Main Form */}
				<motion.div
					className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.35, duration: 0.4 }}>
					{/* Form Content */}
					<form
						onSubmit={handleSubmit}
						className="p-6 sm:p-8">
						<div className="space-y-8">
							{/* Context Block */}
							<motion.div
								className="bg-blue-50 rounded-xl p-6 border border-blue-100"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4, duration: 0.3 }}>
								<h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2 font-mclaren">
									<Home className="w-5 h-5 text-blue-500" />
									Property Information
								</h3>
								<p className="text-sm text-gray-600 font-montserrat">
									This information will be embedded in the NFT metadata. Ensure
									all details are accurate as the blockchain record is
									immutable.
								</p>
							</motion.div>
							{/* Property Details Inputs */}
							<motion.div
								className="grid sm:grid-cols-2 gap-6"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{
									delay: 0.45,
									duration: 0.4,
									staggerChildren: 0.05,
								}}>
								<motion.div
									className="space-y-2"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}>
									<label
										htmlFor="title"
										className="block text-sm font-medium text-gray-700 font-montserrat">
										Property Title <span className="text-red-500">*</span>
									</label>
									<input
										id="title"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										className={`w-full border ${formErrors.title ? "border-red-300" : "border-gray-300"} rounded-lg px-4 py-3 text-base bg-white text-gray-900 font-montserrat focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400`}
										placeholder="e.g. Sunset Villa"
										required
										aria-invalid={!!formErrors.title}
										aria-describedby={
											formErrors.title ? "title-error" : undefined
										}
									/>
									{formErrors.title && (
										<p
											id="title-error"
											className="text-sm text-red-600 font-montserrat">
											{formErrors.title}
										</p>
									)}
								</motion.div>

								<motion.div
									className="space-y-2"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}>
									<label
										htmlFor="location"
										className="block text-sm font-medium text-gray-700 font-montserrat">
										Location <span className="text-red-500">*</span>
									</label>
									<input
										id="location"
										name="location"
										value={formData.location}
										onChange={handleInputChange}
										className={`w-full border ${formErrors.location ? "border-red-300" : "border-gray-300"} rounded-lg px-4 py-3 text-base bg-white text-gray-900 font-montserrat focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400`}
										placeholder="e.g. 123 Ocean Dr, Miami, FL"
										required
										aria-invalid={!!formErrors.location}
										aria-describedby={
											formErrors.location ? "location-error" : undefined
										}
									/>
									{formErrors.location && (
										<p
											id="location-error"
											className="text-sm text-red-600 font-montserrat">
											{formErrors.location}
										</p>
									)}
								</motion.div>

								<motion.div
									className="space-y-2"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}>
									<label
										htmlFor="valuation"
										className="block text-sm font-medium text-gray-700 font-montserrat">
										Valuation (USD) <span className="text-red-500">*</span>
									</label>
									<input
										id="valuation"
										name="valuation"
										value={formData.valuation}
										onChange={handleInputChange}
										className={`w-full border ${formErrors.valuation ? "border-red-300" : "border-gray-300"} rounded-lg px-4 py-3 text-base bg-white text-gray-900 font-montserrat focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400`}
										placeholder="e.g. 500000"
										type="number"
										min="0"
										step="0.01"
										required
										aria-invalid={!!formErrors.valuation}
										aria-describedby={
											formErrors.valuation ? "valuation-error" : undefined
										}
									/>
									{formErrors.valuation ? (
										<p
											id="valuation-error"
											className="text-sm text-red-600 font-montserrat">
											{formErrors.valuation}
										</p>
									) : (
										<p className="text-xs text-gray-500 font-montserrat">
											Initial estimated value of the property in USD.
										</p>
									)}
								</motion.div>

								<motion.div
									className="space-y-2"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}>
									<label
										htmlFor="propertyType"
										className="block text-sm font-medium text-gray-700 font-montserrat">
										Property Type
									</label>
									<select
										id="propertyType"
										name="propertyType"
										value={formData.propertyType}
										onChange={handleInputChange}
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base bg-white text-gray-900 font-montserrat focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer">
										<option value="residential">Residential</option>
										<option value="commercial">Commercial</option>
										<option value="industrial">Industrial</option>
										<option value="land">Land</option>
										<option value="mixed-use">Mixed-Use</option>
									</select>
								</motion.div>

								<motion.div
									className="space-y-2 sm:col-span-2"
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}>
									<label
										htmlFor="description"
										className="block text-sm font-medium text-gray-700 font-montserrat">
										Description
									</label>
									<textarea
										id="description"
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base bg-white text-gray-900 font-montserrat focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px] resize-y placeholder-gray-400"
										placeholder="Describe main features, amenities, and unique selling points..."
										rows={4}
									/>
								</motion.div>
							</motion.div>
							{/* File Upload Section */}
							<div className="space-y-4">
								<label className="block text-sm font-medium text-gray-700 font-montserrat">
									Supporting Documents
								</label>

								<div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-gray-50 transition-all duration-300 group">
									<div className="mx-auto w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
										<Upload className="w-6 h-6 text-blue-600" />
									</div>
									<h4 className="text-gray-900 font-medium mb-1 font-mclaren">
										Upload Property Deed & Photos
									</h4>
									<p className="text-gray-500 text-sm mb-4 font-montserrat">
										Recommended: Property Deed, Owner ID, and Valuation Reports.
										<br />
										<span className="text-xs">
											Max 5MB per file. Supported: JPEG, PNG, GIF, WebP, PDF
										</span>
									</p>
									<p className="text-xs text-blue-500 mb-4 font-medium flex items-center justify-center gap-1 font-montserrat">
										<Shield className="w-3 h-3" />
										Files are encrypted & stored privately via ZK-Commitments.
									</p>

									<input
										type="file"
										multiple
										accept="image/jpeg,image/png,image/gif,image/webp,application/pdf"
										className="hidden"
										id="file-upload"
										onChange={(e) =>
											e.target.files &&
											handleFileSelect(Array.from(e.target.files))
										}
									/>
									<label
										htmlFor="file-upload"
										role="button"
										tabIndex={0}
										onKeyDown={(e) =>
											e.key === "Enter" &&
											document.getElementById("file-upload")?.click()
										}
										className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg cursor-pointer hover:bg-gray-50 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-montserrat"
										aria-label="Browse files to upload">
										Browse Files
									</label>
									<p className="text-xs text-gray-500 mt-4 font-montserrat">
										{selectedFiles.length} of 5 files selected
									</p>
								</div>

								{/* Selected Files List */}
								{selectedFiles.length > 0 && (
									<div className="grid gap-3">
										<h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-montserrat">
											Selected Documents
										</h5>

										{selectedFiles.map((file, index) => {
											let category = "Ownership Document";
											if (index === 1) category = "Identity Verification";
											if (index === 2) category = "Valuation Report";
											if (index > 2) category = "Other Supporting Doc";

											return (
												<div
													key={index}
													className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200 shadow-sm transition-all">
													<div className="flex items-center gap-4 overflow-hidden">
														<div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
															<FileText className="w-5 h-5 text-blue-600" />
														</div>
														<div className="flex flex-col min-w-0">
															<span className="text-sm font-bold text-gray-900 truncate">
																{file.name}
															</span>
															<div className="flex items-center gap-2">
																<span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded uppercase font-bold">
																	{category}
																</span>
																<span className="text-[10px] text-gray-500">
																	{(file.size / 1024).toFixed(0)} KB
																</span>
															</div>
														</div>
													</div>
													<button
														type="button"
														onClick={() => handleRemoveFile(index)}
														className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
														aria-label={`Remove ${file.name}`}>
														<svg
															className="w-5 h-5"
															fill="none"
															viewBox="0 0 24 24"
															stroke="currentColor">
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M6 18L18 6M6 6l12 12"
															/>
														</svg>
													</button>
												</div>
											);
										})}
									</div>
								)}
							</div>

							{/* Tokenization Strategy Section */}
							<div className="space-y-6 pt-8 border-t border-gray-100">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
											<PieChart className="w-5 h-5 text-emerald-600" />
										</div>
										<div>
											<h3 className="text-lg font-bold text-gray-900">
												Tokenization Strategy
											</h3>
											<p className="text-xs text-gray-500">
												Fractionalize your property for investors
											</p>
										</div>
									</div>
									<div className="flex items-center gap-3 bg-gray-100 p-1 rounded-lg">
										<button
											type="button"
											onClick={() =>
												setFormData((prev) => ({
													...prev,
													tokenizationEnabled: !prev.tokenizationEnabled,
												}))
											}
											className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
												formData.tokenizationEnabled
													? "bg-white text-emerald-600 shadow-sm"
													: "text-gray-500"
											}`}
											aria-label="Enable tokenization">
											Enabled
										</button>
										<button
											type="button"
											onClick={() =>
												setFormData((prev) => ({
													...prev,
													tokenizationEnabled: !prev.tokenizationEnabled,
												}))
											}
											className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 ${
												!formData.tokenizationEnabled
													? "bg-white text-gray-600 shadow-sm"
													: "text-gray-500"
											}`}
											aria-label="Disable tokenization">
											Disabled
										</button>
									</div>
								</div>

								{formData.tokenizationEnabled && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: "auto" }}
										className="grid sm:grid-cols-2 gap-6 bg-emerald-50/30 p-6 rounded-2xl border border-emerald-100">
										<div className="space-y-2">
											<label
												htmlFor="targetRaise"
												className="block text-sm font-medium text-gray-700">
												Target Raise (USD){" "}
												<span className="text-red-500">*</span>
											</label>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
													<DollarSign className="w-4 h-4 text-emerald-500" />
												</div>
												<input
													id="targetRaise"
													name="targetRaise"
													type="number"
													value={formData.targetRaise}
													onChange={(e) => {
														const val = e.target.value;
														if (Number(val) > Number(formData.valuation))
															return;
														setFormData((prev) => ({
															...prev,
															targetRaise: val,
														}));
														if (formErrors.targetRaise) {
															setFormErrors((prev) => ({
																...prev,
																targetRaise: "",
															}));
														}
													}}
													className={`w-full border ${
														formErrors.targetRaise
															? "border-red-300"
															: "border-emerald-200"
													} rounded-lg pl-9 pr-4 py-3 text-base bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all`}
													placeholder="Amount to raise"
													min="0"
													step="0.01"
													aria-invalid={!!formErrors.targetRaise}
													aria-describedby={
														formErrors.targetRaise
															? "targetRaise-error"
															: undefined
													}
												/>
											</div>
											{formErrors.targetRaise ? (
												<p
													id="targetRaise-error"
													className="text-[10px] text-red-600">
													{formErrors.targetRaise}
												</p>
											) : (
												<p className="text-[10px] text-gray-500">
													Max raise: ${formData.valuation || "0"} (100% equity)
												</p>
											)}
										</div>

										<div className="space-y-2">
											<label
												htmlFor="tokenSupply"
												className="block text-sm font-medium text-gray-700">
												Total Fractional Supply{" "}
												<span className="text-red-500">*</span>
											</label>
											<div className="relative">
												<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
													<Target className="w-4 h-4 text-emerald-500" />
												</div>
												<input
													id="tokenSupply"
													name="tokenSupply"
													type="number"
													value={formData.tokenSupply}
													onChange={(e) => {
														setFormData((prev) => ({
															...prev,
															tokenSupply: e.target.value,
														}));
														if (formErrors.tokenSupply) {
															setFormErrors((prev) => ({
																...prev,
																tokenSupply: "",
															}));
														}
													}}
													className={`w-full border ${
														formErrors.tokenSupply
															? "border-red-300"
															: "border-emerald-200"
													} rounded-lg pl-9 pr-4 py-3 text-base bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all`}
													placeholder="e.g. 1000"
													min="1"
													step="1"
													aria-invalid={!!formErrors.tokenSupply}
													aria-describedby={
														formErrors.tokenSupply
															? "tokenSupply-error"
															: undefined
													}
												/>
											</div>
											{formErrors.tokenSupply ? (
												<p
													id="tokenSupply-error"
													className="text-[10px] text-red-600">
													{formErrors.tokenSupply}
												</p>
											) : (
												<p className="text-[10px] text-gray-500">
													Number of RWA tokens to mint
												</p>
											)}
										</div>

										{/* ROI & Price Summary */}
										<div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-emerald-100">
											<div className="p-3 bg-white rounded-xl border border-emerald-50">
												<span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight flex items-center gap-1">
													<DollarSign className="w-2.5 h-2.5" />
													Token Price
												</span>
												<div className="text-lg font-black text-gray-900">
													${tokenDetails?.price || "0.00"}
												</div>
											</div>
											<div className="p-3 bg-white rounded-xl border border-emerald-50">
												<span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight flex items-center gap-1">
													<PieChart className="w-2.5 h-2.5" />
													Equity Offered
												</span>
												<div className="text-lg font-black text-emerald-600">
													{tokenDetails?.equity || "0.0"}%
												</div>
											</div>
											<div className="p-3 bg-white rounded-xl border border-emerald-50">
												<span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight flex items-center gap-1">
													<Target className="w-2.5 h-2.5" />
													Tokens/1%
												</span>
												<div className="text-lg font-black text-gray-900">
													{tokenDetails?.tokensPerPercent || "0"}
												</div>
											</div>
											<div className="p-3 bg-white rounded-xl border border-emerald-50">
												<span className="text-[10px] text-gray-500 uppercase font-bold tracking-tight flex items-center gap-1">
													<Zap className="w-2.5 h-2.5" />
													Network
												</span>
												<div className="text-sm font-bold text-gray-600 mt-1 flex items-center gap-1">
													<div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
													Avalanche C-Chain
												</div>
											</div>
										</div>
									</motion.div>
								)}
							</div>

							{/* Submit Button */}
							<div className="pt-6 mt-8 border-t border-gray-200">
								<button
									type="submit"
									disabled={isProcessing || !connected}
									className={`w-full px-6 py-5 rounded-full shadow-lg transition-all duration-500 flex items-center justify-center ${
										isProcessing || !connected
											? "bg-linear-to-r from-gray-400 to-gray-500 cursor-not-allowed opacity-80"
											: "bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 hover:shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-lg"
									}`}
									aria-label={
										formData.tokenizationEnabled
											? "Mint and tokenize property"
											: "Mint property deed"
									}>
									<MintButtonContent />
								</button>

								{!connected && (
									<p
										className="text-center text-sm text-red-500 mt-3 font-medium font-montserrat"
										role="alert">
										Wallet not connected. Please connect via the navigation bar.
									</p>
								)}

								<p className="text-xs text-gray-500 mt-4 text-center px-4 font-montserrat">
									By minting, you agree to the StrataDeed Terms of Service. A
									gas fee (AVAX) will be required to execute this transaction on
									Avalanche C-Chain.
								</p>
							</div>
						</div>
					</form>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}

// Wrap with error boundary
const MintFormWithErrorBoundary = withErrorBoundary(MintFormContent);

// Main Page Component
export default function MintPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
					<div className="text-center">
						<div className="w-16 h-16 mx-auto mb-4 relative">
							<Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
						</div>
						<h3 className="text-lg font-semibold text-gray-900">
							Loading Mint Page
						</h3>
						<p className="text-sm text-gray-500 mt-1">
							Preparing your property minting experience...
						</p>
					</div>
				</div>
			}>
			<MintFormWithErrorBoundary />
		</Suspense>
	);
}
