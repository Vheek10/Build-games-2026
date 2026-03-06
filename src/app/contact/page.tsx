/** @format */
"use client";

import { Mail, Phone, MapPin, ArrowRight, ArrowUpRight, Building2, Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
	return (
		<div className="min-h-screen bg-linear-to-b from-white to-gray-50">
			<section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
				{/* Gradient background accent */}
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute -top-32 -right-24 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
					<div className="absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
				</div>

				<div className="relative max-w-6xl mx-auto">
					<div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10 lg:gap-14 items-start">
						{/* Left: Intro + Form */}
						<div>
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-5 border border-red-100">
								<Building2 className="w-4 h-4 text-red-600" />
								<span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-red-700 font-montserrat">
									CONTACT STRATADEED
								</span>
							</div>

							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight tracking-tight font-mclaren">
								Let&apos;s talk about{" "}
								<span className="bg-linear-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
									tokenized real estate
								</span>
							</h1>

							<p className="text-base sm:text-lg text-gray-600 max-w-xl mb-8 font-medium font-montserrat">
								Whether you&apos;re a property owner, investor, or partner, we&apos;d love to hear from
								you. Share a few details and our team will get back to you.
							</p>

							<form className="space-y-5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm">
								<div className="grid sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5 font-montserrat">
											Full name
										</label>
										<input
											type="text"
											placeholder="Full Name"
											className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:border-red-500/70 transition-shadow"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5 font-montserrat">
											Work email
										</label>
										<input
											type="email"
											placeholder="you@company.com"
											className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:border-red-500/70 transition-shadow"
										/>
									</div>
								</div>

								<div className="grid sm:grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5 font-montserrat">
											Company (optional)
										</label>
										<input
											type="text"
											placeholder="StrataDeed Labs"
											className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:border-red-500/70 transition-shadow"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1.5 font-montserrat">
											Topic
										</label>
										<select className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:border-red-500/70">
											<option>General question</option>
											<option>Property tokenization</option>
											<option>Investment / partnership</option>
											<option>Product feedback</option>
										</select>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1.5 font-montserrat">
										Message
									</label>
									<textarea
										rows={4}
										placeholder="Tell us a bit about what you’re looking to explore with StrataDeed."
										className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/70 focus:border-red-500/70 transition-shadow resize-none"
									/>
								</div>

								<div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
									<motion.button
										type="submit"
										whileHover={{
											scale: 1.05,
											y: -5,
											backgroundColor: "#9f2149",
											transition: { duration: 0.4 },
										}}
										whileTap={{ scale: 0.98 }}
										className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(159,33,73,0.4)]"
									>
										<span className="text-[10px] font-black uppercase tracking-[0.4em] font-montserrat">Send message</span>
										<ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
									</motion.button>
									<p className="text-xs sm:text-sm text-gray-500 font-montserrat">
										We typically respond within 1–2 business days.
									</p>
								</div>
							</form>
						</div>

						{/* Right: Contact details / offices / social */}
						<aside className="space-y-6 lg:space-y-7">
							<div className="rounded-2xl border border-gray-200 bg-linear-to-br from-gray-900 to-black text-gray-100 p-5 sm:p-6 lg:p-7 relative overflow-hidden">
								<div className="absolute inset-0 opacity-10 pointer-events-none">
									<div className="absolute inset-0" style={{
										backgroundImage:
											`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FFFF' fill-opacity='0.25'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
										backgroundSize: "40px 40px",
									}} />
								</div>

								<div className="relative z-10 space-y-5">
									<div>
										<p className="text-[10px] font-black uppercase tracking-[0.4em] text-red-300 mb-2 font-montserrat">
											TALK TO OUR TEAM
										</p>
										<h2 className="text-xl sm:text-2xl font-black mb-2 tracking-tight font-mclaren">
											Prototype, but fully serious about the future.
										</h2>
										<p className="text-sm text-gray-300 leading-relaxed font-montserrat">
											StrataDeed is an MVP demonstrating how property deeds can be
											tokenized on-chain. Use this contact channel to discuss ideas,
											feedback, or collaborations.
										</p>
									</div>

									<div className="space-y-4 text-sm">
										<div className="flex items-start gap-3">
											<div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 border border-red-400/50">
												<Mail className="w-4 h-4 text-red-300" />
											</div>
											<div>
												<p className="text-gray-400">Email</p>
												<a
													href="mailto:hello@stratadeed.xyz"
													className="font-medium text-white hover:text-red-300 transition-colors"
												>
													hello@stratadeed.xyz
												</a>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-400/40">
												<Phone className="w-4 h-4 text-emerald-300" />
											</div>
											<div>
												<p className="text-gray-400">Preferred channel</p>
												<p className="font-medium text-white">
													Email first; calls available on request.
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 border border-red-400/40">
												<MapPin className="w-4 h-4 text-red-300" />
											</div>
											<div>
												<p className="text-gray-400">Location</p>
												<p className="font-medium text-white">
													Remote-first • Global fintech & real estate contributors
												</p>
											</div>
										</div>
									</div>

									<div className="pt-2 border-t border-white/10">
										<p className="text-[10px] text-gray-400 mb-3 font-black uppercase tracking-[0.4em] font-montserrat">
											COMMUNITY & UPDATES
										</p>
										<div className="flex items-center gap-3">
											<Link
												href="#"
												className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 hover:border-red-400/70 hover:bg-red-500/10 text-gray-300 hover:text-red-300 transition-colors"
											>
												<Twitter className="w-4 h-4" />
											</Link>
											<Link
												href="#"
												className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 hover:border-red-400/70 hover:bg-red-500/10 text-gray-300 hover:text-red-300 transition-colors"
											>
												<Linkedin className="w-4 h-4" />
											</Link>
											<Link
												href="#"
												className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-700 hover:border-red-400/70 hover:bg-red-500/10 text-gray-300 hover:text-red-300 transition-colors"
											>
												<Github className="w-4 h-4" />
											</Link>
										</div>
									</div>
								</div>
							</div>

							<div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/80 p-4 sm:p-5 text-xs sm:text-sm text-gray-600 space-y-2">
								<p className="font-black text-gray-900 font-montserrat">
									Note: StrataDeed is a demo / prototype environment.
								</p>
								<p>
									Do not share sensitive personal, financial, or property-identifying
									information through this form. For regulated activities, always consult
									with licensed professionals in your jurisdiction.
								</p>
							</div>
						</aside>
					</div>
				</div>
			</section>
		</div>
	);
}


