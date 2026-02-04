/** @format */

"use client";

import { useState, useEffect } from "react";
import {
	X,
	DollarSign,
	PieChart,
	Users,
	TrendingUp,
	Calendar,
	Shield,
	CheckCircle,
	CreditCard,
	Lock,
	AlertCircle,
	Info,
	Building,
	MapPin,
	Home,
	Coins,
} from "lucide-react";
import { useSuiWallet } from "@/providers/suiet-provider";
import { motion, AnimatePresence } from "framer-motion";
import MarketplacePage from "@/app/marketplace/page";
import Dashboard from "@/app/dashboard/page";

interface Property {
	id: number;
	title: string;
	description: string;
	location: string;
	price: number;
	bedrooms: number;
	bathrooms: number;
	squareFeet: number;
	capacity: number;
	views: number;
	isFeatured: boolean;
	country: string;
	createdAt: string;
	type: string;
	rating?: number;
	investmentReturn?: number;
}

interface InvestNowModalProps {
	isOpen: boolean;
	onClose: () => void;
	property: Property;
	imageUrl: string;
}

// Mock contract ABI for demo - replace with your actual contract ABI
const MOCK_STRATA_DEED_RWA_ABI = [
	{
		inputs: [],
		name: "totalSupply",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "tokenPrice",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "minInvestment",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "maxInvestment",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "availableTokens",
		outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
		name: "invest",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
] as const;

// Mock contract address - replace with your actual contract address
const MOCK_STRATA_DEED_RWA_ADDRESS =
	"0x0000000000000000000000000000000000000000" as `0x${string}`;

export default function InvestNowModal({
	isOpen,
	onClose,
	property,
	imageUrl,
}: InvestNowModalProps) {
	const { address, connected: isConnected } = useSuiWallet();
	const [investmentAmount, setInvestmentAmount] = useState<string>("");
	const [selectedTokens, setSelectedTokens] = useState<number>(0);
	const [step, setStep] = useState<"select" | "confirm" | "success">("select");
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isMockMode, setIsMockMode] = useState(true); // Using mock data since contracts don't exist

	// For demo purposes, use mock data since contract doesn't exist
	const tokenPriceNum = property.price / 1000; // Assuming 1000 tokens total
	const minInvestmentNum = 50; // Minimum 2 tokens
	const maxInvestmentNum = tokenPriceNum * 100; // Maximum 100 tokens per transaction
	const totalTokensNum = 1000; // Mock total token supply
	const availableTokensNum = 750; // Mock available tokens (75%)

	// Contract interaction for investing (mock for now)
	// Contract interaction stubs for Sui-only mode (mocked)
	const {
		data: hash,
		writeContract,
		isPending,
		error: contractError,
	} = {
		data: undefined,
		writeContract: async () => ({}),
		isPending: false,
		error: null,
	} as const;
	const { isLoading: isConfirming, isSuccess: isConfirmed } = {
		isLoading: false,
		isSuccess: false,
	} as const;

	// Calculate investment values
	const calculateTokens = (amount: number) =>
		Math.floor(amount / tokenPriceNum);
	const calculateEquity = (tokens: number) =>
		totalTokensNum > 0 ? ((tokens / totalTokensNum) * 100).toFixed(2) : "0.00";
	const calculateEstReturn = (tokens: number) => {
		const annualReturn = property.investmentReturn || 8; // Default 8%
		return ((tokens * tokenPriceNum * annualReturn) / 100).toFixed(2);
	};

	// Handle investment amount input
	const handleAmountChange = (value: string) => {
		setError(null);
		const amount = parseFloat(value);
		if (isNaN(amount)) {
			setInvestmentAmount("");
			setSelectedTokens(0);
			return;
		}

		if (amount < minInvestmentNum) {
			setError(
				`Minimum investment is $${minInvestmentNum.toFixed(2)} (${Math.ceil(
					minInvestmentNum / tokenPriceNum,
				)} tokens)`,
			);
		} else if (amount > maxInvestmentNum) {
			setError(
				`Maximum investment per transaction is $${maxInvestmentNum.toFixed(
					2,
				)} (${Math.floor(maxInvestmentNum / tokenPriceNum)} tokens)`,
			);
		} else if (amount > property.price) {
			setError("Investment cannot exceed property valuation");
		} else {
			setError(null);
		}

		setInvestmentAmount(value);
		setSelectedTokens(calculateTokens(amount));
	};

	// Handle token selection
	const handleTokenSelect = (tokens: number) => {
		setError(null);
		const amount = tokens * tokenPriceNum;

		if (tokens > availableTokensNum) {
			setError(`Only ${availableTokensNum} tokens available`);
			return;
		}

		setSelectedTokens(tokens);
		setInvestmentAmount(amount.toFixed(2));
	};

	// Handle investment submission
	const handleInvest = async () => {
		if (!isConnected || !address) {
			setError("Please connect your wallet to invest");
			return;
		}

		if (!investmentAmount || parseFloat(investmentAmount) < minInvestmentNum) {
			setError(`Minimum investment is $${minInvestmentNum.toFixed(2)}`);
			return;
		}

		setIsProcessing(true);
		setStep("confirm");

		try {
			if (isMockMode) {
				// Mock transaction for demo
				console.log("Mock investment:", {
					propertyId: property.id,
					amount: investmentAmount,
					tokens: selectedTokens,
					address,
				});

				// Simulate transaction delay
				await new Promise((resolve) => setTimeout(resolve, 1500));

				// Simulate successful transaction
				setStep("success");
			} else {
				// Real contract call (when you have the contract deployed)
				// writeContract({
				// 	address: MOCK_STRATA_DEED_RWA_ADDRESS,
				// 	abi: MOCK_STRATA_DEED_RWA_ABI,
				// 	functionName: 'invest',
				// 	args: [parseEther(investmentAmount)],
				// 	value: parseEther(investmentAmount),
				// });
			}
		} catch (err: any) {
			console.error("Investment error:", err);
			setError(err.message || "Transaction failed. Please try again.");
			setStep("select");
		} finally {
			setIsProcessing(false);
		}
	};

	// Handle successful transaction
	useEffect(() => {
		if (isConfirmed && !isMockMode) {
			setStep("success");
			setIsProcessing(false);
		}
	}, [isConfirmed, isMockMode]);

	// Handle contract errors
	useEffect(() => {
		if (contractError && !isMockMode) {
			setError(contractError.message || "Contract transaction failed");
			setStep("select");
			setIsProcessing(false);
		}
	}, [contractError, isMockMode]);

	// Reset form when modal closes
	useEffect(() => {
		if (!isOpen) {
			setTimeout(() => {
				setStep("select");
				setInvestmentAmount("");
				setSelectedTokens(0);
				setError(null);
				setIsProcessing(false);
			}, 300);
		}
	}, [isOpen]);

	// Close modal on escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) onClose();
		};
		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [onClose, isOpen]);

	// Token preset options - dynamically calculate based on token price
	const tokenPresets = [10, 25, 50, 100].filter(
		(tokens) =>
			tokens * tokenPriceNum <= maxInvestmentNum &&
			tokens <= availableTokensNum,
	);

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	// Format USD with 2 decimals
	const formatUSD = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	};

	// Network validation - for Sui mode assume OK when connected
	const isCorrectNetwork = !!isConnected;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
					/>

					{/* Modal Container */}
					<div className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-4">
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 mx-2 sm:mx-0">
							{/* Header */}
							<div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800">
								<div className="flex items-center gap-2 sm:gap-3">
									<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
										<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
									</div>
									<div className="min-w-0">
										<h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate">
											Invest in Property
										</h2>
										<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
											{property.title} • {property.location.split(",")[0]}
										</p>
									</div>
								</div>
								<button
									onClick={onClose}
									className="p-1 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
									aria-label="Close modal">
									<X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
								</button>
							</div>

							{/* Content */}
							<div className="overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-200px)]">
								<div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
									{/* Demo Mode Notice */}
									{isMockMode && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
											<div className="flex items-center gap-3">
												<Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
												<div>
													<p className="text-sm font-medium text-blue-800 dark:text-blue-300">
														Demo Mode
													</p>
													<p className="text-xs text-blue-700/80 dark:text-blue-400/80 mt-1">
														This is a demonstration. Connect your wallet and
														switch to Mantle Sepolia for real transactions.
													</p>
												</div>
											</div>
										</motion.div>
									)}

									{/* Network Warning */}
									{!isCorrectNetwork && isConnected && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
											<div className="flex items-center gap-3">
												<AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
												<div>
													<p className="text-sm font-medium text-amber-800 dark:text-amber-300">
														Wrong Network
													</p>
													<p className="text-xs text-amber-700/80 dark:text-amber-400/80 mt-1">
														Please switch to Mantle Sepolia (Chain ID: 5003) to
														invest.
													</p>
												</div>
											</div>
										</motion.div>
									)}

									{/* Property Overview */}
									<div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 sm:p-5 border border-blue-100 dark:border-blue-800/30">
										<div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
											<div className="w-full sm:w-20 h-48 sm:h-20 rounded-xl overflow-hidden flex-shrink-0">
												<img
													src={imageUrl}
													alt={property.title}
													className="w-full h-full object-cover"
												/>
											</div>
											<div className="flex-1 min-w-0">
												<h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 truncate">
													{property.title}
												</h3>
												<div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
													<MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
													<span className="truncate">{property.location}</span>
												</div>
												<div className="grid grid-cols-3 gap-2 sm:gap-3">
													<div className="text-center">
														<div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
															{formatCurrency(property.price)}
														</div>
														<div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
															Valuation
														</div>
													</div>
													<div className="text-center">
														<div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
															{property.investmentReturn || 8}%
														</div>
														<div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
															Est. ROI
														</div>
													</div>
													<div className="text-center">
														<div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
															{availableTokensNum}/{totalTokensNum}
														</div>
														<div className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
															Tokens
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									{step === "select" && (
										<>
											{/* Token Quick Select */}
											<div className="space-y-2 sm:space-y-3">
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
													Quick Select Tokens
												</label>
												<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
													{tokenPresets.map((tokens) => (
														<button
															key={tokens}
															onClick={() => handleTokenSelect(tokens)}
															className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
																selectedTokens === tokens
																	? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
																	: "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
															}`}>
															<div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
																{tokens}
															</div>
															<div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
																Tokens
															</div>
															<div className="text-[10px] sm:text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
																${(tokens * tokenPriceNum).toFixed(0)}
															</div>
														</button>
													))}
												</div>
											</div>

											{/* Custom Investment */}
											<div className="space-y-2 sm:space-y-3">
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
													Custom Investment Amount
												</label>
												<div className="relative">
													<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
														<DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
													</div>
													<input
														type="number"
														value={investmentAmount}
														onChange={(e) => handleAmountChange(e.target.value)}
														className="w-full pl-10 pr-20 sm:pl-10 sm:pr-24 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
														placeholder="0.00"
														min={minInvestmentNum}
														max={maxInvestmentNum}
														step="0.01"
													/>
													<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
														<span className="text-sm text-gray-500 dark:text-gray-400">
															USD
														</span>
													</div>
												</div>
												<div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 gap-1">
													<span>Min: {formatUSD(minInvestmentNum)}</span>
													<span>Max: {formatUSD(maxInvestmentNum)}</span>
												</div>
											</div>

											{/* Investment Summary */}
											{selectedTokens > 0 && (
												<motion.div
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: "auto" }}
													className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-xl p-4 sm:p-5 border border-emerald-100 dark:border-emerald-800/30">
													<h4 className="font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center gap-2">
														<PieChart className="w-3 h-3 sm:w-4 sm:h-4" />
														Investment Summary
													</h4>
													<div className="grid grid-cols-2 gap-3 sm:gap-4">
														<div>
															<div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
																Tokens
															</div>
															<div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
																{selectedTokens}
															</div>
														</div>
														<div>
															<div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
																Equity Stake
															</div>
															<div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">
																{calculateEquity(selectedTokens)}%
															</div>
														</div>
														<div>
															<div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
																Token Price
															</div>
															<div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
																{formatUSD(tokenPriceNum)}
															</div>
														</div>
														<div>
															<div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
																Est. Annual Return
															</div>
															<div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
																${calculateEstReturn(selectedTokens)}
															</div>
														</div>
													</div>
												</motion.div>
											)}

											{/* Error Message */}
											{error && (
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
													<AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
													<p className="text-xs sm:text-sm text-red-700 dark:text-red-300">
														{error}
													</p>
												</motion.div>
											)}

											{/* Security Features */}
											<div className="space-y-2 sm:space-y-3">
												<h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm sm:text-base">
													<Shield className="w-3 h-3 sm:w-4 sm:h-4" />
													Secure Investment
												</h4>
												<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
													<div className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
														<Lock className="w-3 h-3 text-blue-500" />
														<span className="text-xs text-gray-600 dark:text-gray-400">
															Escrow Protected
														</span>
													</div>
													<div className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
														<CheckCircle className="w-3 h-3 text-emerald-500" />
														<span className="text-xs text-gray-600 dark:text-gray-400">
															Verified Property
														</span>
													</div>
													<div className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
														<Coins className="w-3 h-3 text-purple-500" />
														<span className="text-xs text-gray-600 dark:text-gray-400">
															RWA Tokens
														</span>
													</div>
												</div>
											</div>
										</>
									)}

									{step === "confirm" && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="text-center space-y-4 sm:space-y-6">
											<div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
												<CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
											</div>
											<div>
												<h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
													Confirm Your Investment
												</h3>
												<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
													{isMockMode
														? "This is a demo. In production, you would confirm the transaction in your wallet."
														: "Please confirm the transaction in your wallet"}
												</p>
											</div>
											<div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
														Property
													</span>
													<span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white truncate ml-2">
														{property.title}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
														Investment Amount
													</span>
													<span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
														{formatUSD(parseFloat(investmentAmount))}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
														Tokens to Receive
													</span>
													<span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
														{selectedTokens}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 dark:text-gray400">
														Equity Stake
													</span>
													<span className="font-semibold text-sm sm:text-base text-emerald-600 dark:text-emerald-400">
														{calculateEquity(selectedTokens)}%
													</span>
												</div>
												<div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
													<div className="flex justify-between items-center">
														<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
															Network Fee
														</span>
														<span className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white">
															~$2.50
														</span>
													</div>
												</div>
											</div>
											{(isProcessing || isPending) && (
												<div className="flex items-center justify-center gap-2 sm:gap-3">
													<div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
													<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
														{isPending
															? "Waiting for wallet confirmation..."
															: "Processing transaction..."}
													</span>
												</div>
											)}
										</motion.div>
									)}

									{step === "success" && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											className="text-center space-y-4 sm:space-y-6">
											<div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
												<CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-400" />
											</div>
											<div>
												<h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
													{isMockMode
														? "Demo Successful! "
														: "Investment Successful! "}
												</h3>
												<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
													You now own {selectedTokens} tokens in{" "}
													<span className="font-semibold">
														{property.title}
													</span>
												</p>
											</div>
											<div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
												{hash && !isMockMode ? (
													<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
														<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
															Transaction Hash
														</span>
														<a
															href={`https://explorer.sepolia.mantle.xyz/tx/${hash}`}
															target="_blank"
															rel="noopener noreferrer"
															className="font-mono text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline truncate">
															{hash.slice(0, 10)}...{hash.slice(-8)}
														</a>
													</div>
												) : (
													<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
														<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
															Demo Transaction
														</span>
														<span className="font-mono text-xs sm:text-sm text-blue-600 dark:text-blue-400 truncate">
															0xDEMO...TRANSACTION
														</span>
													</div>
												)}
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
														Tokens Issued
													</span>
													<span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
														{selectedTokens}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
														Total Investment
													</span>
													<span className="font-bold text-sm sm:text-base text-gray-900 dark:text-white">
														{formatUSD(parseFloat(investmentAmount))}
													</span>
												</div>
											</div>
											<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 sm:p-4">
												<div className="flex items-start gap-2 sm:gap-3">
													<Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
													<div className="text-left">
														<p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
															{isMockMode
																? "This was a demo transaction. In production, your RWA tokens would appear in your portfolio."
																: "Your RWA tokens will appear in your portfolio within a few minutes. You can view and manage your investment from the dashboard."}
														</p>
													</div>
												</div>
											</div>
										</motion.div>
									)}
								</div>
							</div>

							{/* Footer */}
							<div className="border-t border-gray-100 dark:border-gray-800 p-4 sm:p-6">
								{step === "select" && (
									<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
										<button
											onClick={onClose}
											className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base">
											Cancel
										</button>
										<button
											onClick={handleInvest}
											disabled={!selectedTokens || !!error || isProcessing}
											className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
											{isProcessing ? (
												<>
													<div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
													Processing...
												</>
											) : (
												<>
													<DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
													{isMockMode ? "Try Demo Investment" : "Invest Now"}
												</>
											)}
										</button>
									</div>
								)}

								{step === "confirm" && (
									<div className="text-center space-y-3 sm:space-y-4">
										<button
											onClick={() => setStep("select")}
											className="text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm sm:text-base">
											← Back to Edit
										</button>
										<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
											{isMockMode
												? "Demo mode - No real transaction will occur"
												: isPending
													? "Waiting for wallet confirmation..."
													: "Confirm the transaction in your wallet"}
										</p>
									</div>
								)}

								{step === "success" && (
									<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
										<button
											onClick={onClose}
											className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm sm:text-base">
											Close
										</button>
										<button
											onClick={() => {
												onClose();
												// Navigate to portfolio page
												window.location.href = "/dashboard";
											}}
											className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-600 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
											<TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
											View Portfolio
										</button>
									</div>
								)}
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
