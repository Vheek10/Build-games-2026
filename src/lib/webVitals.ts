/** @format */

/**
 * Web Vitals monitoring utility
 * Tracks Core Web Vitals for performance monitoring
 */

export interface WebVitalsMetric {
	name: string;
	value: number;
	rating: "good" | "needs-improvement" | "poor";
	delta: number;
	id: string;
}

/**
 * Report Web Vitals to analytics or console
 */
export function reportWebVitals(metric: WebVitalsMetric) {
	// In development, log to console
	if (process.env.NODE_ENV === "development") {
		console.log(`[Web Vitals] ${metric.name}:`, {
			value: metric.value,
			rating: metric.rating,
			delta: metric.delta,
		});
	}

	// In production, send to your analytics service
	// Example: sendToAnalytics(metric);
}

/**
 * Get thresholds for Web Vitals
 */
export function getWebVitalThresholds(metric: string): {
	good: number;
	needsImprovement: number;
} {
	const thresholds: Record<string, { good: number; needsImprovement: number }> =
		{
			FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
			LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
			FID: { good: 100, needsImprovement: 300 }, // First Input Delay
			CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
			TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
			INP: { good: 200, needsImprovement: 500 }, // Interaction to Next Paint
		};

	return thresholds[metric] || { good: 0, needsImprovement: 0 };
}

/**
 * Calculate performance score based on Web Vitals
 */
export function calculatePerformanceScore(metrics: {
	lcp?: number;
	fid?: number;
	cls?: number;
	fcp?: number;
	ttfb?: number;
}): {
	score: number;
	grade: "A" | "B" | "C" | "D" | "F";
	details: string[];
} {
	let totalScore = 0;
	const issues: string[] = [];
	let metricCount = 0;

	// LCP (25% of score)
	if (metrics.lcp !== undefined) {
		metricCount++;
		const lcpThresholds = getWebVitalThresholds("LCP");
		if (metrics.lcp <= lcpThresholds.good) {
			totalScore += 25;
		} else if (metrics.lcp <= lcpThresholds.needsImprovement) {
			totalScore += 15;
			issues.push("LCP needs improvement");
		} else {
			totalScore += 5;
			issues.push("Poor LCP - optimize images and critical resources");
		}
	}

	// FID (25% of score)
	if (metrics.fid !== undefined) {
		metricCount++;
		const fidThresholds = getWebVitalThresholds("FID");
		if (metrics.fid <= fidThresholds.good) {
			totalScore += 25;
		} else if (metrics.fid <= fidThresholds.needsImprovement) {
			totalScore += 15;
			issues.push("FID needs improvement");
		} else {
			totalScore += 5;
			issues.push("Poor FID - reduce JavaScript execution time");
		}
	}

	// CLS (25% of score)
	if (metrics.cls !== undefined) {
		metricCount++;
		const clsThresholds = getWebVitalThresholds("CLS");
		if (metrics.cls <= clsThresholds.good) {
			totalScore += 25;
		} else if (metrics.cls <= clsThresholds.needsImprovement) {
			totalScore += 15;
			issues.push("CLS needs improvement");
		} else {
			totalScore += 5;
			issues.push("Poor CLS - add size attributes to images");
		}
	}

	// FCP (25% of score)
	if (metrics.fcp !== undefined) {
		metricCount++;
		const fcpThresholds = getWebVitalThresholds("FCP");
		if (metrics.fcp <= fcpThresholds.good) {
			totalScore += 25;
		} else if (metrics.fcp <= fcpThresholds.needsImprovement) {
			totalScore += 15;
			issues.push("FCP needs improvement");
		} else {
			totalScore += 5;
			issues.push("Poor FCP - optimize server response time");
		}
	}

	const normalizedScore = metricCount > 0 ? totalScore / metricCount : 0;

	let grade: "A" | "B" | "C" | "D" | "F";
	if (normalizedScore >= 90) grade = "A";
	else if (normalizedScore >= 75) grade = "B";
	else if (normalizedScore >= 60) grade = "C";
	else if (normalizedScore >= 50) grade = "D";
	else grade = "F";

	return {
		score: Math.round(normalizedScore),
		grade,
		details: issues.length > 0 ? issues : ["All metrics look good!"],
	};
}

/**
 * Simple performance observer for custom metrics
 */
export function observePerformance(
	callback: (entries: PerformanceEntry[]) => void,
) {
	if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
		return null;
	}

	try {
		const observer = new PerformanceObserver((list) => {
			callback(list.getEntries());
		});

		// Observe various performance entry types
		observer.observe({
			entryTypes: [
				"navigation",
				"resource",
				"paint",
				"largest-contentful-paint",
			],
		});

		return observer;
	} catch (error) {
		console.error("Performance observer error:", error);
		return null;
	}
}
