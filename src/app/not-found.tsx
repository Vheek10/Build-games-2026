/** @format */

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
	return (
		<section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
			{/* Background image + overlays to match hero styling */}
			<div className="absolute inset-0 -z-10">
				<div className="relative w-full h-full">
					<Image
						src="/hero.avif"
						alt="Modern architectural building background"
						fill
						className="object-cover object-center"
						sizes="100vw"
						priority={false}
					/>
				</div>
				<div className="absolute inset-0 bg-linear-to-br from-gray-900/80 via-gray-900/85 to-gray-900/90" />
				<div className="absolute inset-0 bg-linear-to-r from-blue-900/30 via-transparent to-cyan-900/30" />
				<div className="absolute inset-0 opacity-[0.03]">
					<div className="h-full w-full bg-[linear-gradient(45deg,transparent_48%,rgba(59,130,246,0.15)_48%,rgba(59,130,246,0.15)_52%,transparent_52%)] bg-size-[120px_120px]" />
				</div>
			</div>

			<div className="relative w-full px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					{/* Badge */}
					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-gray-900/60 backdrop-blur-md mb-8">
						<span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
						<span className="text-xs font-semibold tracking-[0.18em] text-gray-300 uppercase">
							404 — Page Not Found
						</span>
					</div>

					{/* Main heading */}
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
						This page could not be found
					</h1>

					<p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-300 mb-8 sm:mb-10 leading-relaxed">
						The link you followed may be broken, expired, or the page may have
						been moved. You can return to the main dashboard of StrataDeed or
						jump straight into the marketplace.
					</p>

					{/* Helpful hints */}
					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 sm:mb-12">
						<div className="rounded-xl border border-gray-700/60 bg-gray-900/70 px-4 py-3 text-left">
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
								Check the URL
							</p>
							<p className="text-xs sm:text-sm text-gray-300">
								Make sure the address is spelled correctly and uses the right
								network.
							</p>
						</div>
						<div className="rounded-xl border border-gray-700/60 bg-gray-900/70 px-4 py-3 text-left">
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
								Explore properties
							</p>
							<p className="text-xs sm:text-sm text-gray-300">
								Browse tokenized real estate opportunities on the marketplace.
							</p>
						</div>
						<div className="rounded-xl border border-gray-700/60 bg-gray-900/70 px-4 py-3 text-left">
							<p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
								Head back home
							</p>
							<p className="text-xs sm:text-sm text-gray-300">
								Start again from the homepage to navigate where you need to go.
							</p>
						</div>
					</div>

					{/* CTAs */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
						<Link
							href="/"
							className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl bg-linear-to-r from-blue-600 to-cyan-500 text-white text-sm sm:text-base font-semibold shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-[1.02]">
							<ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-0.5 transition-transform" />
							<span>Back to Home</span>
						</Link>
						<Link
							href="/marketplace"
							className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-xl border border-gray-700/70 bg-gray-900/70 text-sm sm:text-base text-gray-100 font-semibold hover:border-blue-400/80 hover:bg-gray-900/90 transition-all duration-300">
							<Compass className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 group-hover:rotate-3 transition-transform" />
							<span>Explore Marketplace</span>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
