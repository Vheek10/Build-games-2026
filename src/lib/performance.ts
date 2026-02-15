/** @format */

/**
 * Performance optimization utilities
 */

/**
 * Debounce function to limit how often a function is called
 */
export function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: NodeJS.Timeout | null = null;
	return (...args: Parameters<T>) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

/**
 * Throttle function to limit function execution rate
 */
export function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number,
): (...args: Parameters<T>) => void {
	let inThrottle: boolean;
	return (...args: Parameters<T>) => {
		if (!inThrottle) {
			func(...args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

/**
 * Lazy load images with intersection observer
 */
export function observeImages(
	callback: (entries: IntersectionObserverEntry[]) => void,
) {
	if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
		return null;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			callback(entries);
		},
		{
			rootMargin: "50px 0px",
			threshold: 0.01,
		},
	);

	return observer;
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
	if (typeof document === "undefined") return;

	const link = document.createElement("link");
	link.rel = "preload";
	link.href = href;
	link.as = as;
	document.head.appendChild(link);
}

/**
 * Check if component should update (shallow comparison)
 */
export function shallowEqual(obj1: any, obj2: any): boolean {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (let key of keys1) {
		if (obj1[key] !== obj2[key]) {
			return false;
		}
	}

	return true;
}
