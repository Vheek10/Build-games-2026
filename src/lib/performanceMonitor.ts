/** @format */

/**
 * Performance monitoring initialization
 * Use this in your _app.tsx or layout.tsx to track Web Vitals
 */

import { reportWebVitals } from "./webVitals";

export function initPerformanceMonitoring() {
	if (typeof window === "undefined") return;

	// Track Web Vitals using Next.js built-in support
	if (typeof window.performance !== "undefined") {
		// Monitor LCP (Largest Contentful Paint)
		const lcpObserver = new PerformanceObserver((list) => {
			const entries = list.getEntries();
			const lastEntry = entries[entries.length - 1] as any;

			reportWebVitals({
				name: "LCP",
				value: lastEntry.renderTime || lastEntry.loadTime,
				rating: lastEntry.renderTime < 2500 ? "good" : "needs-improvement",
				delta: lastEntry.renderTime || lastEntry.loadTime,
				id: `v1-${Date.now()}-${Math.random()}`,
			});

			lcpObserver.disconnect();
		});

		try {
			lcpObserver.observe({
				type: "largest-contentful-paint",
				buffered: true,
			});
		} catch (e) {
			// LCP not supported
		}

		// Monitor FID (First Input Delay)
		const fidObserver = new PerformanceObserver((list) => {
			const entries = list.getEntries();
			entries.forEach((entry: any) => {
				reportWebVitals({
					name: "FID",
					value: entry.processingStart - entry.startTime,
					rating:
						entry.processingStart - entry.startTime < 100
							? "good"
							: "needs-improvement",
					delta: entry.processingStart - entry.startTime,
					id: `v1-${Date.now()}-${Math.random()}`,
				});
			});
		});

		try {
			fidObserver.observe({
				type: "first-input",
				buffered: true,
			});
		} catch (e) {
			// FID not supported
		}

		// Monitor CLS (Cumulative Layout Shift)
		let clsValue = 0;
		const clsObserver = new PerformanceObserver((list) => {
			const entries = list.getEntries();
			entries.forEach((entry: any) => {
				if (!entry.hadRecentInput) {
					clsValue += entry.value;
				}
			});

			reportWebVitals({
				name: "CLS",
				value: clsValue,
				rating:
					clsValue < 0.1
						? "good"
						: clsValue < 0.25
							? "needs-improvement"
							: "poor",
				delta: clsValue,
				id: `v1-${Date.now()}-${Math.random()}`,
			});
		});

		try {
			clsObserver.observe({
				type: "layout-shift",
				buffered: true,
			});
		} catch (e) {
			// CLS not supported
		}

		// Log navigation timing
		window.addEventListener("load", () => {
			const navigation = performance.getEntriesByType(
				"navigation",
			)[0] as PerformanceNavigationTiming;

			if (navigation) {
				const metrics = {
					ttfb: navigation.responseStart - navigation.requestStart,
					domLoad: navigation.domContentLoadedEventEnd - navigation.fetchStart,
					windowLoad: navigation.loadEventEnd - navigation.fetchStart,
				};

				if (process.env.NODE_ENV === "development") {
					console.log("[Performance Metrics]", metrics);
				}

				reportWebVitals({
					name: "TTFB",
					value: metrics.ttfb,
					rating: metrics.ttfb < 800 ? "good" : "needs-improvement",
					delta: metrics.ttfb,
					id: `v1-${Date.now()}-${Math.random()}`,
				});
			}
		});
	}
}

/**
 * Track custom performance marks
 */
export function markPerformance(name: string) {
	if (typeof window !== "undefined" && window.performance) {
		performance.mark(name);
	}
}

/**
 * Measure time between two marks
 */
export function measurePerformance(
	name: string,
	startMark: string,
	endMark: string,
) {
	if (typeof window !== "undefined" && window.performance) {
		try {
			performance.measure(name, startMark, endMark);
			const measure = performance.getEntriesByName(name)[0];
			if (process.env.NODE_ENV === "development") {
				console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
			}
			return measure.duration;
		} catch (e) {
			console.error("Performance measurement error:", e);
		}
	}
	return null;
}
