/** @format */
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 240);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const handleClick = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			aria-label="Scroll to top"
			className={`fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-red-500/30 bg-red-600/90 text-white shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
				visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
			}`}>
			<ArrowUp className="w-5 h-5" />
		</button>
	);
}


