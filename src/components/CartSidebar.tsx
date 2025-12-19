/** @format */
"use client";

import { X, ShoppingCart, CreditCard, Shield } from "lucide-react";

interface CartItem {
	property: any;
	quantity: number;
}

interface CartSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	cart: CartItem[];
	onUpdateQuantity: (propertyId: number, quantity: number) => void;
	onRemoveItem: (propertyId: number) => void;
	cartTotal: number;
}

export default function CartSidebar({
	isOpen,
	onClose,
	cart,
	onUpdateQuantity,
	onRemoveItem,
	cartTotal,
}: CartSidebarProps) {
	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
				onClick={onClose}
				aria-hidden="true"
			/>

			{/* Sidebar */}
			<div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col animate-in slide-in-from-right-4 duration-300">
				{/* Header */}
				<div className="p-6 border-b border-gray-200 dark:border-gray-800">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<ShoppingCart className="w-6 h-6 text-blue-600" />
							<h2 className="text-xl font-bold text-gray-900 dark:text-white">
								Investment Cart
							</h2>
						</div>
						<button
							onClick={onClose}
							className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
							<X className="w-5 h-5 text-gray-500" />
						</button>
					</div>
					<p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
						{cart.length} properties selected
					</p>
				</div>

				{/* Cart Items */}
				<div className="flex-1 overflow-y-auto p-6">
					{cart.length === 0 ? (
						<div className="text-center py-12">
							<ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
								Your cart is empty
							</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Add properties to your cart to start investing
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{cart.map((item) => (
								<div
									key={item.property.id}
									className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
									<div className="flex items-start gap-4">
										<img
											src={item.property.image || "/images/unsplash-7fde63acd811.jpg"}
											alt={item.property.title}
											className="w-20 h-16 rounded-lg object-cover"
										/>
										<div className="flex-1">
											<h4 className="font-semibold text-gray-900 dark:text-white text-sm">
												{item.property.title}
											</h4>
											<p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
												{item.property.location}
											</p>
											<div className="flex items-center justify-between mt-3">
												<div className="text-lg font-bold text-gray-900 dark:text-white">
													${item.property.price.toLocaleString()}
												</div>
												<div className="flex items-center gap-2">
													<button
														onClick={() =>
															onUpdateQuantity(item.property.id, item.quantity - 1)
														}
														className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
														-
													</button>
													<span className="w-8 text-center font-medium">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															onUpdateQuantity(item.property.id, item.quantity + 1)
														}
														className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
														+
													</button>
												</div>
											</div>
										</div>
										<button
											onClick={() => onRemoveItem(item.property.id)}
											className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-600 dark:text-red-400">
											<X className="w-4 h-4" />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				{cart.length > 0 && (
					<div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
						<div className="flex justify-between items-center">
							<span className="text-gray-600 dark:text-gray-400">
								Total Investment
							</span>
							<span className="text-2xl font-bold text-gray-900 dark:text-white">
								${cartTotal.toLocaleString()}
							</span>
						</div>
						<div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-lg">
							<Shield className="w-4 h-4" />
							<span>All properties are verified and insured</span>
						</div>
						<button className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center justify-center gap-2">
							<CreditCard className="w-5 h-5" />
							Proceed to Checkout
						</button>
						<p className="text-xs text-gray-500 dark:text-gray-400 text-center">
							By proceeding, you agree to our Terms of Service and Privacy
							Policy
						</p>
					</div>
				)}
			</div>
		</>
	);
}