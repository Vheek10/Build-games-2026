/** @format */
"use client";

import { Shield, Truck, Percent, Lock } from "lucide-react";

export default function MarketplaceFooter() {
	return (
		<div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div>
					<div className="flex items-center gap-2 mb-4">
						<Shield className="w-5 h-5 text-blue-600" />
						<span className="font-bold text-gray-900 dark:text-white">
							Secure Transactions
						</span>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						All transactions are secured with bank-level encryption and
						verified ownership.
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-4">
						<Truck className="w-5 h-5 text-blue-600" />
						<span className="font-bold text-gray-900 dark:text-white">
							Global Delivery
						</span>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Properties available for acquisition worldwide with comprehensive
						documentation.
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-4">
						<Percent className="w-5 h-5 text-blue-600" />
						<span className="font-bold text-gray-900 dark:text-white">
							Flexible Financing
						</span>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Multiple financing options available with competitive rates for
						qualified buyers.
					</p>
				</div>
				<div>
					<div className="flex items-center gap-2 mb-4">
						<Lock className="w-5 h-5 text-blue-600" />
						<span className="font-bold text-gray-900 dark:text-white">
							24/7 Support
						</span>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Dedicated support team available around the clock for all your
						inquiries.
					</p>
				</div>
			</div>
		</div>
	);
}