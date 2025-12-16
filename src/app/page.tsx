/** @format */

import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import ComplianceSection from "@/components/home/ComplianceSection";
import MissionVisionSection from "@/components/home/MissionVisionSection";
import FinalCTASection from "@/components/home/FinalCTASection";

/**
 * Homepage Component.
 * Acts as the landing page, aggregating various sections to tell the StrataDeed story.
 */
export default function Homepage() {
	return (
		<div className="min-h-screen bg-white dark:bg-gray-950">
			{/* Main Hero Banner */}
			<HeroSection />

			{/* Explainer: Tokenization Process */}
			<HowItWorksSection />

			{/* Comparison: Traditional vs Tokenized Real Estate */}
			<ComparisonSection />

			{/* Security & Compliance Highlight */}
			<ComplianceSection />

			{/* Company Mission Statement */}
			<MissionVisionSection />

			{/* Call to Action */}
			<FinalCTASection />
		</div>
	);
}
