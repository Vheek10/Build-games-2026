/** @format */

"use client";

import { useState, useEffect } from "react";
import {
	X,
	DollarSign,
	PieChart,
	TrendingUp,
	Shield,
	CheckCircle,
	CreditCard,
	Lock,
	AlertCircle,
	Info,
	MapPin,
	Coins,
} from "lucide-react";
import {
	useAccount,
	useChainId,
	useReadContract,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { parseEther, zeroAddress } from "viem";
import {
	FRACTIONAL_DEED_TOKEN_ABI,
	FRACTIONAL_DEED_TOKEN_ADDRESS,
	STRATA_DEED_CORE_ABI,
	STRATA_DEED_CORE_ADDRESS,
} from "@/config/contracts";

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

export default function InvestNowModal({
	isOpen,
	onClose,
	property,
	imageUrl,
}: InvestNowModalProps) {
	const { address, isConnected } = useAccount();
	const chainId = useChainId();
	const [investmentAmount, setInvestmentAmount] = useState<string>("");
	const [selectedTokens, setSelectedTokens] = useState<number>(0);
	const [step, setStep] = useState<"select" | "confirm" | "success">("select");
	const [error, setError] = useState<string | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState(0);

	const tokenPriceNum = property.price / 1000; // Assuming 1000 tokens total
	const minInvestmentNum = 100; // Minimum investment amount in USD
	const maxInvestmentNum = tokenPriceNum * 100; // Maximum 100 tokens per transaction
	const totalTokensNum = 1000; // Mock total token supply
	const availableTokensNum = 750; // Mock available tokens (75%)

	const {
		data: hash,
		writeContract,
		isPending,
		error: contractError,
	} = useWriteContract();
	const { data: resolvedFromCore } = useReadContract({
		address: (STRATA_DEED_CORE_ADDRESS || zeroAddress) as `0x${string}`,
		abi: STRATA_DEED_CORE_ABI,
		functionName: "getFractionalToken",
		args: [BigInt(property.id)],
	});
	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({ hash });
	const activeFractionalTokenAddress =
		FRACTIONAL_DEED_TOKEN_ADDRESS ||
		(resolvedFromCore && resolvedFromCore !== zeroAddress
			? resolvedFromCore
			: "");
	const isDemoFallback = !activeFractionalTokenAddress;

	// Calculate investment values
	const calculateTokens = (amount: number) => {
		if (amount < minInvestmentNum) return 0;
		// Use proportional ownership so dollar input and token summary stay consistent.
		return amount / tokenPriceNum;
	};
	const calculateEquity = (tokens: number) =>
		totalTokensNum > 0 ? ((tokens / totalTokensNum) * 100).toFixed(2) : "0.00";
	const calculateEstReturn = (tokens: number) => {
		const annualReturn = property.investmentReturn || 8; // Default 8%
		return ((tokens * tokenPriceNum * annualReturn) / 100).toFixed(2);
	};

	const formatTokenAmount = (tokens: number) => {
		if (!Number.isFinite(tokens)) return "0";
		if (Number.isInteger(tokens)) return tokens.toString();
		return tokens.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 4,
		});
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
		if (!isConnected && !address) {
			setError("Please connect your wallet to invest");
			return;
		}

		if (!investmentAmount || parseFloat(investmentAmount) < minInvestmentNum) {
			setError(`Minimum investment is $${minInvestmentNum.toFixed(2)}`);
			return;
		}

		setIsProcessing(true);
		setProgress(15);
		setStep("confirm");

		try {
			if (!activeFractionalTokenAddress) {
				for (const nextProgress of [25, 45, 70, 90, 100]) {
					await new Promise((resolve) => setTimeout(resolve, 250));
					setProgress(nextProgress);
				}
				setIsProcessing(false);
				setStep("success");
				return;
			}

			writeContract({
				address: activeFractionalTokenAddress as `0x${string}`,
				abi: FRACTIONAL_DEED_TOKEN_ABI,
				functionName: "depositEscrow",
				value: parseEther(investmentAmount),
			});
			setProgress(40);
			setIsProcessing(false);
		} catch (err: unknown) {
			setError(err instanceof Error ? err.message : "Investment failed");
			setStep("select");
			setIsProcessing(false);
			setProgress(0);
		}
	};

	// Reset form when modal closes
	useEffect(() => {
		if (!isOpen) {
			setTimeout(() => {
				setStep("select");
				setInvestmentAmount("");
				setSelectedTokens(0);
				setError(null);
				setIsProcessing(false);
				setProgress(0);
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

	const displayError =
		error ||
		(contractError instanceof Error
			? contractError.message
			: contractError
				? "Contract transaction failed"
				: null);
	const currentStep = isConfirmed ? "success" : step;
	const isCorrectNetwork = chainId === 43113 || chainId === 43114;

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
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9999"
					/>

					{/* Modal Container */}
					<div className="fixed inset-0 z-10000 flex items-center justify-center p-2 sm:p-4">
						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 30 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.92, y: 30 }}
							transition={{ type: "spring", damping: 25, stiffness: 300 }}
							className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl border border-gray-200 mx-2 sm:mx-0">
							{/* Header */}
							<div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
								<div className="flex items-center gap-2 sm:gap-3">
									<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-red-500 to-red-400 flex items-center justify-center shrink-0">
										<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
									</div>
									<div className="min-w-0">
										<h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate font-mclaren">
											Invest in Property
										</h2>
										<p className="text-xs sm:text-sm text-gray-500 truncate font-montserrat">
											{property.title} • {property.location.split(",")[0]}
										</p>
									</div>
								</div>
								<button
									onClick={onClose}
									className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
									aria-label="Close modal">
									<motion.div
										whileHover={{ rotate: 90, scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
										transition={{ duration: 0.2 }}>
										<X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
									</motion.div>
								</button>
							</div>

							{/* Content */}
							<div className="overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-200px)]">
								<div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
									{/* Network Warning */}
									{!isCorrectNetwork && isConnected && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="bg-amber-50 border border-amber-200 rounded-xl p-4">
											<div className="flex items-center gap-3">
												<AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
												<div>
													<p className="text-sm font-medium text-amber-800 font-montserrat">
														Wrong Network
													</p>
													<p className="text-xs text-amber-700/80 mt-1 font-montserrat">
														Please switch to Avalanche Fuji Testnet to invest.
													</p>
												</div>
											</div>
										</motion.div>
									)}

									{/* Property Overview */}
									<motion.div
										initial={{ opacity: 0, y: -15 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.1 }}
										className="bg-linear-to-r from-red-50 to-red-50 rounded-xl p-4 sm:p-5 border border-red-100">
										<div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
											<motion.div
												className="w-full sm:w-20 h-48 sm:h-20 rounded-xl overflow-hidden shrink-0"
												whileHover={{ scale: 1.05 }}
												transition={{ duration: 0.3 }}>
												<img
													src={imageUrl}
													alt={property.title}
													className="w-full h-full object-cover"
												/>
											</motion.div>
											<div className="flex-1 min-w-0">
												<h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 truncate font-mclaren">
													{property.title}
												</h3>
												<div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2 font-montserrat">
													<MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
													<span className="truncate">{property.location}</span>
												</div>
												<div className="grid grid-cols-3 gap-2 sm:gap-3">
													<div className="text-center">
														<div className="text-lg sm:text-2xl font-bold text-gray-900 font-mclaren">
															{formatCurrency(property.price)}
														</div>
														<div className="text-[10px] sm:text-xs text-gray-500 font-montserrat">
															Valuation
														</div>
													</div>
													<div className="text-center">
														<div className="text-lg sm:text-2xl font-bold text-emerald-600">
															{property.investmentReturn || 8}%
														</div>
														<div className="text-[10px] sm:text-xs text-gray-500 font-montserrat">
															Est. ROI
														</div>
													</div>
													<div className="text-center">
														<div className="text-lg sm:text-2xl font-bold text-red-600">
															{availableTokensNum}/{totalTokensNum}
														</div>
														<div className="text-[10px] sm:text-xs text-gray-500 font-montserrat">
															Tokens
														</div>
													</div>
												</div>
											</div>
										</div>
									</motion.div>

									{currentStep === "select" && (
										<>
											{/* Token Quick Select */}
											<motion.div
												className="space-y-2 sm:space-y-3"
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4, delay: 0.15 }}>
												<label className="block text-sm font-medium text-gray-700 font-montserrat">
													Quick Select Tokens
												</label>
												<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
													{tokenPresets.map((tokens, index) => (
														<motion.button
															key={tokens}
															onClick={() => handleTokenSelect(tokens)}
															initial={{ opacity: 0, scale: 0.9 }}
															animate={{ opacity: 1, scale: 1 }}
															transition={{
																duration: 0.3,
																delay: 0.1 + index * 0.05,
															}}
															whileHover={{ scale: 1.05, y: -3 }}
															whileTap={{ scale: 0.95 }}
															className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
																selectedTokens === tokens
																	? "border-red-500 bg-red-50 shadow-lg"
																	: "border-gray-200 hover:border-red-300"
															}`}>
															<div className="text-base sm:text-lg font-bold text-gray-900 font-montserrat">
																{tokens}
															</div>
															<div className="text-xs sm:text-sm text-gray-500 font-montserrat">
																Tokens
															</div>
															<div className="text-[10px] sm:text-xs text-red-600 font-semibold mt-1 font-montserrat">
																${(tokens * tokenPriceNum).toFixed(0)}
															</div>
														</motion.button>
													))}
												</div>
											</motion.div>
											<motion.div
												className="space-y-2 sm:space-y-3"
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4, delay: 0.25 }}>
												<label className="block text-sm font-medium text-gray-700 font-montserrat">
													Custom Investment Amount
												</label>
												<motion.div
													className="relative"
													whileFocus={{ scale: 1.01 }}
													transition={{ type: "tween", duration: 0.2 }}>
													<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
														<DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
													</div>
													<input
														type="number"
														value={investmentAmount}
														onChange={(e) => handleAmountChange(e.target.value)}
														className="w-full pl-10 pr-20 sm:pl-10 sm:pr-24 py-3 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
														placeholder="0.00"
														min={minInvestmentNum}
														max={maxInvestmentNum}
														step="0.01"
													/>
													<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
														<span className="text-sm text-gray-500">USD</span>
													</div>
												</motion.div>
												<div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm text-gray-500 gap-1 font-montserrat">
													<span>Min: {formatUSD(minInvestmentNum)}</span>
													<span>Max: {formatUSD(maxInvestmentNum)}</span>
												</div>
											</motion.div>

											{/* Investment Summary */}
											{selectedTokens > 0 && (
												<motion.div
													initial={{ opacity: 0, height: 0 }}
													animate={{ opacity: 1, height: "auto" }}
													className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-5 border border-emerald-100">
													<h4 className="font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 font-mclaren">
														<PieChart className="w-3 h-3 sm:w-4 sm:h-4" />
														Investment Summary
													</h4>
													<div className="grid grid-cols-2 gap-3 sm:gap-4">
														<div>
															<div className="text-xs sm:text-sm text-gray-500 font-montserrat">
																Tokens
															</div>
															<div className="text-lg sm:text-xl font-bold text-gray-900 font-montserrat">
																{selectedTokens}
															</div>
														</div>
														<div>
															<div className="text-xs sm:text-sm text-gray-500 font-montserrat">
																Equity Stake
															</div>
															<div className="text-lg sm:text-xl font-bold text-emerald-600 font-montserrat">
																{calculateEquity(selectedTokens)}%
															</div>
														</div>
														<div>
															<div className="text-xs sm:text-sm text-gray-500 font-montserrat">
																Token Price
															</div>
															<div className="text-lg sm:text-xl font-bold text-gray-900 font-montserrat">
																{formatUSD(tokenPriceNum)}
															</div>
														</div>
														<div>
															<div className="text-xs sm:text-sm text-gray-500 font-montserrat">
																Est. Annual Return
															</div>
															<div className="text-lg sm:text-xl font-bold text-red-600 font-montserrat">
																${calculateEstReturn(selectedTokens)}
															</div>
														</div>
													</div>
												</motion.div>
											)}

											{/* Error Message */}
											{displayError && (
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl">
													<AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0" />
													<p className="text-xs sm:text-sm text-red-700 font-montserrat">
														{displayError}
													</p>
												</motion.div>
											)}

											{/* Security Features */}
											<div className="space-y-2 sm:space-y-3">
												<h4 className="font-semibold text-gray-900 flex items-center gap-2 text-sm sm:text-base font-montserrat">
													<Shield className="w-3 h-3 sm:w-4 sm:h-4" />
													Secure Investment
												</h4>
												<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
													<div className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
														<Lock className="w-3 h-3 text-red-500" />
														<span className="text-xs text-gray-600 font-montserrat">
															Escrow Protected
														</span>
													</div>
													<div className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
														<CheckCircle className="w-3 h-3 text-emerald-500" />
														<span className="text-xs text-gray-600 font-montserrat">
															Verified Property
														</span>
													</div>
													<div className="flex items-center gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
														<Coins className="w-3 h-3 text-purple-500" />
														<span className="text-xs text-gray-600 font-montserrat">
															RWA Tokens
														</span>
													</div>
												</div>
											</div>
										</>
									)}

									{currentStep === "confirm" && (
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.4 }}
											className="text-center space-y-4 sm:space-y-6">
											<motion.div
												className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center"
												animate={{ y: [0, -8, 0] }}
												transition={{
													duration: 1.5,
													repeat: Infinity,
													ease: "easeInOut",
												}}>
												<CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
											</motion.div>
											<div>
												<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-mclaren">
													Confirm Your Investment
												</h3>
												<p className="text-sm sm:text-base text-gray-600 font-montserrat">
													{isDemoFallback
														? "No on-chain token found for this property. Running demo investment flow."
														: "Submitting your investment transaction on Avalanche."}
												</p>
											</div>
											<div className="bg-gray-50 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
														Property
													</span>
													<span className="font-semibold text-sm sm:text-base text-gray-900 truncate ml-2 font-montserrat">
														{property.title}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
														Investment Amount
													</span>
													<span className="font-semibold text-sm sm:text-base text-gray-900 font-montserrat">
														{formatUSD(parseFloat(investmentAmount))}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
														Tokens to Receive
													</span>
													<span className="font-semibold text-sm sm:text-base text-gray-900 font-montserrat">
														{formatTokenAmount(selectedTokens)}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
														Equity Stake
													</span>
													<span className="font-semibold text-sm sm:text-base text-emerald-600 font-montserrat">
														{calculateEquity(selectedTokens)}%
													</span>
												</div>
												<div className="pt-3 sm:pt-4 border-t border-gray-200">
													<div className="flex justify-between items-center">
														<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
															Network Fee
														</span>
														<span className="font-semibold text-sm sm:text-base text-gray-900 font-montserrat">
															~$2.50
														</span>
													</div>
												</div>
											</div>
											{(isProcessing || isPending) && (
												<div className="space-y-3">
													<div className="flex items-center justify-center gap-2 sm:gap-3">
														<div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
														<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
															{isDemoFallback
																? "Processing demo transaction..."
																: isConfirming
																	? "Confirming transaction on-chain..."
																	: isPending
																		? "Submitting transaction..."
																		: "Processing transaction..."}
														</span>
													</div>
													<div className="w-full max-w-sm mx-auto">
														<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
															<motion.div
																className="h-full bg-linear-to-r from-red-500 to-emerald-500"
																initial={{ width: 0 }}
																animate={{
																	width: `${Math.max(progress, isPending ? 65 : 0, isConfirming ? 90 : 0, isConfirmed ? 100 : 0)}%`,
																}}
																transition={{ duration: 0.25, ease: "easeOut" }}
															/>
														</div>
														<p className="mt-1 text-xs text-gray-500 font-montserrat text-center">
															{Math.max(
																progress,
																isPending ? 65 : 0,
																isConfirming ? 90 : 0,
																isConfirmed ? 100 : 0,
															)}
															% complete
														</p>
													</div>
												</div>
											)}
										</motion.div>
									)}

									{currentStep === "success" && (
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.4 }}
											className="text-center space-y-4 sm:space-y-6">
											<motion.div
												className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center"
												initial={{ scale: 0, rotate: -180 }}
												animate={{ scale: 1, rotate: 0 }}
												transition={{
													duration: 0.6,
													type: "spring",
													stiffness: 200,
													damping: 15,
												}}>
												<motion.div
													animate={{ scale: [1, 1.15, 1] }}
													transition={{ duration: 2, repeat: Infinity }}>
													<CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
												</motion.div>
											</motion.div>
											<div>
												<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-mclaren">
													Investment Successful!
												</h3>
												<p className="text-sm sm:text-base text-gray-600 font-montserrat">
													You now own {formatTokenAmount(selectedTokens)} tokens
													in{" "}
													<span className="font-semibold">
														{property.title}
													</span>
												</p>
											</div>
											<div className="bg-linear-to-r from-emerald-50 to-teal-50 rounded-xl p-4 sm:p-6 space-y-3 sm:space-y-4">
												{hash ? (
													<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
														<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
															Transaction Hash
														</span>
														<a
															href={`https://testnet.snowtrace.io/tx/${hash}`}
															target="_blank"
															rel="noopener noreferrer"
															className="font-mono text-xs sm:text-sm text-red-600 hover:underline truncate">
															{hash.slice(0, 10)}...{hash.slice(-8)}
														</a>
													</div>
												) : (
													<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-0">
														<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
															Transaction Status
														</span>
														<span className="font-mono text-xs sm:text-sm text-red-600 truncate">
															Confirmed
														</span>
													</div>
												)}
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
														Tokens Issued
													</span>
													<span className="font-bold text-sm sm:text-base text-gray-900 font-montserrat">
														{formatTokenAmount(selectedTokens)}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span className="text-xs sm:text-sm text-gray-600 font-montserrat">
														Total Investment
													</span>
													<span className="font-bold text-sm sm:text-base text-gray-900 font-montserrat">
														{formatUSD(parseFloat(investmentAmount))}
													</span>
												</div>
											</div>
											<div className="bg-red-50 rounded-xl p-3 sm:p-4">
												<div className="flex items-start gap-2 sm:gap-3">
													<Info className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0 mt-0.5" />
													<div className="text-left">
														<p className="text-xs sm:text-sm text-gray-700 font-montserrat">
															Your RWA tokens will appear in your portfolio
															within a few minutes. You can view and manage your
															investment from the dashboard.
														</p>
													</div>
												</div>
											</div>
										</motion.div>
									)}
								</div>
							</div>

							{/* Footer */}
							<div className="border-t border-gray-100 p-4 sm:p-6">
								{currentStep === "select" && (
									<motion.div
										className="flex flex-col sm:flex-row gap-2 sm:gap-3"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: 0.3 }}>
										<motion.button
											onClick={onClose}
											whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
											whileTap={{ scale: 0.98 }}
											className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-black rounded-full hover:bg-gray-50 transition-colors">
											<span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-montserrat">
												Cancel
											</span>
										</motion.button>
										<motion.button
											onClick={handleInvest}
											disabled={
												!selectedTokens || !!displayError || isProcessing
											}
											whileHover={{
												scale:
													!selectedTokens || !!displayError || isProcessing
														? 1
														: 1.05,
												y: -2,
											}}
											whileTap={{ scale: 0.95 }}
											className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white font-black rounded-full hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3">
											{isProcessing ? (
												<>
													<motion.div
														className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full"
														animate={{ rotate: 360 }}
														transition={{
															duration: 0.8,
															repeat: Infinity,
															ease: "linear",
														}}
													/>
													<span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-montserrat">
														Processing...
													</span>
												</>
											) : (
												<>
													<span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-montserrat">
														Invest Now
													</span>
													<motion.div
														animate={{ x: [0, 3, 0] }}
														transition={{ duration: 1.5, repeat: Infinity }}>
														<DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
													</motion.div>
												</>
											)}
										</motion.button>
									</motion.div>
								)}

								{currentStep === "confirm" && (
									<div className="text-center space-y-3 sm:space-y-4">
										<button
											onClick={() => setStep("select")}
											className="text-red-600 font-medium hover:underline text-sm sm:text-base font-montserrat">
											← Back to Edit
										</button>
										<p className="text-xs sm:text-sm text-gray-500 font-montserrat">
											{isDemoFallback
												? "Demo mode - no live fractional token is configured for this property."
												: isConfirming
													? "Awaiting on-chain confirmation..."
													: isPending
														? "Transaction submitted. Finalizing now..."
														: "Preparing transaction..."}
										</p>
									</div>
								)}

								{currentStep === "success" && (
									<motion.div
										className="flex flex-col sm:flex-row gap-2 sm:gap-3"
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.4 }}>
										<motion.button
											onClick={onClose}
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-black rounded-full hover:bg-gray-50 transition-colors">
											<span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-montserrat">
												Close
											</span>
										</motion.button>
										<motion.button
											onClick={() => {
												onClose();
												// Navigate to portfolio page
												window.location.href = "/dashboard";
											}}
											whileHover={{ scale: 1.05, y: -2 }}
											whileTap={{ scale: 0.95 }}
											className="px-6 sm:px-8 py-3 sm:py-4 bg-emerald-600 text-white font-black rounded-full hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
											<span className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-montserrat">
												View Portfolio
											</span>
											<motion.div
												animate={{ x: [0, 3, 0] }}
												transition={{ duration: 1.5, repeat: Infinity }}>
												<TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
											</motion.div>
										</motion.button>
									</motion.div>
								)}
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
}
