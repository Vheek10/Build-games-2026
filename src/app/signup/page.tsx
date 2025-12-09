/** @format */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	ArrowLeft,
	User,
	Mail,
	Lock,
	Eye,
	EyeOff,
	UserPlus,
	Chrome,
	Github,
	Wallet,
	Shield,
	CheckCircle,
	Sparkles,
	Home,
	Building2,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function SignUpPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isConnectingWallet, setIsConnectingWallet] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		acceptTerms: false,
		walletConnected: false,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate passwords match
		if (formData.password !== formData.confirmPassword) {
			alert("Passwords don't match!");
			return;
		}

		setIsLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		setIsLoading(false);
		router.push("/dashboard");
	};

	const handleConnectWallet = async () => {
		setIsConnectingWallet(true);

		// Simulate wallet connection
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setFormData((prev) => ({ ...prev, walletConnected: true }));
		setIsConnectingWallet(false);

		// Show success message
		alert("Wallet connected successfully!");
	};

	const handleChange = (
		field: keyof typeof formData,
		value: string | boolean,
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
			<div className="w-full max-w-6xl flex flex-col lg:flex-row gap-0 lg:gap-0 min-h-[90vh]">
				{/* Left Column - Background Image */}
				<div className="lg:w-3/5 relative hidden lg:block">
					<div className="absolute inset-0">
						<Image
							src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
							alt="Luxury modern home interior with natural light"
							fill
							className="object-cover"
							priority
							sizes="60vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-900/50 to-transparent" />

						{/* Floating Elements */}
						<div className="absolute top-8 left-8">
							<Link
								href="/"
								className="inline-flex items-center gap-2 text-sm text-white hover:text-blue-100 transition-colors duration-200 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-lg">
								<ArrowLeft className="w-4 h-4" />
								Back to home
							</Link>
						</div>

						{/* Content Overlay */}
						<div className="absolute bottom-8 left-8 right-8">
							<div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-md">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
										<Home className="w-6 h-6 text-blue-200" />
									</div>
									<div>
										<h3 className="text-xl font-bold text-white">StrataDeed</h3>
										<p className="text-blue-100 text-sm">
											Blockchain Real Estate
										</p>
									</div>
								</div>

								<h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
									Join the Future of{" "}
									<span className="text-cyan-200">Real Estate</span>
								</h2>

								<div className="space-y-3 mb-6">
									<div className="flex items-center gap-3 text-blue-100">
										<Shield className="w-5 h-5 text-emerald-400" />
										<span>Bank-grade security</span>
									</div>
									<div className="flex items-center gap-3 text-blue-100">
										<Building2 className="w-5 h-5 text-cyan-400" />
										<span>Verified property access</span>
									</div>
									<div className="flex items-center gap-3 text-blue-100">
										<CheckCircle className="w-5 h-5 text-blue-400" />
										<span>Instant verification</span>
									</div>
								</div>

								<div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
									<div className="text-center">
										<div className="text-xl font-bold text-white">25K+</div>
										<div className="text-xs text-blue-200">Properties</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-white">45+</div>
										<div className="text-xs text-blue-200">Countries</div>
									</div>
									<div className="text-center">
										<div className="text-xl font-bold text-white">99.9%</div>
										<div className="text-xs text-blue-200">Secure</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column - Sign Up Form */}
				<div className="lg:w-2/5">
					<div className="h-full flex flex-col justify-center p-4 lg:p-8">
						{/* Back Button - Mobile */}
						<div className="lg:hidden mb-6">
							<Link
								href="/"
								className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
								<ArrowLeft className="w-4 h-4" />
								Back to home
							</Link>
						</div>

						{/* Card */}
						<div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl p-6">
							{/* Header */}
							<div className="text-center mb-6">
								<div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 rounded-xl flex items-center justify-center">
									<UserPlus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
								</div>
								<h1 className="text-xl font-bold text-gray-900 dark:text-white">
									Create Account
								</h1>
								<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
									Start your investment journey
								</p>
							</div>

							{/* Connect Wallet Button */}
							<button
								onClick={handleConnectWallet}
								disabled={isConnectingWallet || formData.walletConnected}
								className={cn(
									"w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 text-sm",
									"bg-gradient-to-r from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 text-white font-semibold rounded-lg",
									"hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
									formData.walletConnected &&
										"bg-gradient-to-r from-emerald-600 to-green-500",
									"disabled:opacity-70 disabled:cursor-not-allowed",
									"group",
								)}>
								{isConnectingWallet ? (
									<>
										<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
										<span>Connecting...</span>
									</>
								) : formData.walletConnected ? (
									<>
										<CheckCircle className="w-4 h-4" />
										<span>Wallet Connected ✓</span>
									</>
								) : (
									<>
										<Wallet className="w-4 h-4 group-hover:scale-110 transition-transform" />
										<span>Connect Wallet</span>
									</>
								)}
							</button>

							{/* Divider */}
							<div className="relative my-4">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
								</div>
								<div className="relative flex justify-center">
									<span className="px-3 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-xs font-medium">
										Or use email
									</span>
								</div>
							</div>

							{/* Form */}
							<form
								onSubmit={handleSubmit}
								className="space-y-4">
								{/* Name */}
								<div>
									<label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
										Full Name
									</label>
									<div className="relative">
										<User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type="text"
											value={formData.name}
											onChange={(e) => handleChange("name", e.target.value)}
											placeholder="First Last"
											required
											className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										/>
									</div>
								</div>

								{/* Email */}
								<div>
									<label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
										Email Address
									</label>
									<div className="relative">
										<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type="email"
											value={formData.email}
											onChange={(e) => handleChange("email", e.target.value)}
											placeholder="you@example.com"
											required
											className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										/>
									</div>
								</div>

								{/* Password */}
								<div>
									<label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
										Password
									</label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type={showPassword ? "text" : "password"}
											value={formData.password}
											onChange={(e) => handleChange("password", e.target.value)}
											placeholder="••••••••"
											required
											minLength={8}
											className="w-full pl-9 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										/>
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
											{showPassword ? (
												<EyeOff className="w-4 h-4 text-gray-400" />
											) : (
												<Eye className="w-4 h-4 text-gray-400" />
											)}
										</button>
									</div>
								</div>

								{/* Confirm Password */}
								<div>
									<label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
										Confirm Password
									</label>
									<div className="relative">
										<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
										<input
											type={showConfirmPassword ? "text" : "password"}
											value={formData.confirmPassword}
											onChange={(e) =>
												handleChange("confirmPassword", e.target.value)
											}
											placeholder="••••••••"
											required
											className="w-full pl-9 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
										/>
										<button
											type="button"
											onClick={() =>
												setShowConfirmPassword(!showConfirmPassword)
											}
											className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
											{showConfirmPassword ? (
												<EyeOff className="w-4 h-4 text-gray-400" />
											) : (
												<Eye className="w-4 h-4 text-gray-400" />
											)}
										</button>
									</div>
								</div>

								{/* Terms */}
								<div>
									<label className="flex items-start gap-2 cursor-pointer">
										<input
											type="checkbox"
											checked={formData.acceptTerms}
											onChange={(e) =>
												handleChange("acceptTerms", e.target.checked)
											}
											required
											className="w-3.5 h-3.5 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
										/>
										<span className="text-xs text-gray-600 dark:text-gray-400">
											I agree to{" "}
											<Link
												href="/terms"
												className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
												Terms
											</Link>{" "}
											&{" "}
											<Link
												href="/privacy"
												className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
												Privacy
											</Link>
										</span>
									</label>
								</div>

								{/* Submit Button */}
								<button
									type="submit"
									disabled={isLoading}
									className={cn(
										"w-full flex items-center justify-center gap-2 px-4 py-3 text-sm",
										"bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg",
										"hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300",
										"disabled:opacity-70 disabled:cursor-not-allowed",
										"group",
									)}>
									{isLoading ? (
										<>
											<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
											<span>Creating Account...</span>
										</>
									) : (
										<>
											<UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
											<span>Create Account</span>
										</>
									)}
								</button>

								{/* Social Sign Up */}
								<div className="grid grid-cols-2 gap-2">
									<button
										type="button"
										className="flex items-center justify-center gap-2 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 group/social">
										<Chrome className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover/social:scale-110 transition-transform" />
										<span className="font-medium text-gray-700 dark:text-gray-300">
											Google
										</span>
									</button>
									<button
										type="button"
										className="flex items-center justify-center gap-2 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-[1.02] transition-all duration-200 group/social">
										<Github className="w-4 h-4 text-gray-700 dark:text-gray-300 group-hover/social:scale-110 transition-transform" />
										<span className="font-medium text-gray-700 dark:text-gray-300">
											GitHub
										</span>
									</button>
								</div>

								{/* Sign In Link */}
								<div className="text-center pt-2">
									<p className="text-xs text-gray-600 dark:text-gray-400">
										Already have an account?{" "}
										<Link
											href="/signin"
											className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors">
											Sign in
										</Link>
									</p>
								</div>
							</form>

							{/* Footer */}
							<div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
								<div className="flex items-center justify-center gap-2">
									<Shield className="w-3 h-3 text-emerald-500" />
									<p className="text-xs text-center text-gray-500 dark:text-gray-400">
										Secure & compliant
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
