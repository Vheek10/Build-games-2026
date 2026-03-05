/** @format */
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Zap, Grid, Lock } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function HeroSection() {
  const features = [
    {
      icon: Zap,
      title: "Instant, Liquid Trading",
      description:
        "Buy or sell your real estate fractional shares instantly, 24/7, just like trading crypto.",
    },
    {
      icon: Grid,
      title: "Fractional Deeds",
      description:
        "Legally co-own physical properties that are transformed into thousands of digital shares.",
    },
    {
      icon: Lock,
      title: "ZK-Privacy Compliance",
      description:
        "Trade confidently with privacy-focused technology that verifies users while protecting sensitive data.",
    },
  ];
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28 bg-black">
      <Navbar />

      <div className="z-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col gap-6">
            {/* Left Content */}
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start z-20 max-w-2xl">
              {/* Badge */}
              <div className="px-2 py-1 border-r border-l border-primary-light rounded-lg mb-2">
                <span className="font-montserrat text-xs uppercase text-white">
                  The Future of Property Ownership
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-6">
                Unlock Real Estate Wealth for Everyone.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mb-10 font-montserrat">
                Start owning prime real estate with small amounts of money
                through secure, private fractional ownership.
              </p>

              {/* CTA Button */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
                className="mb-16"
              >
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primay/100 text-white rounded-lg font-semibold"
                >
                  Get Started
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="lg:absolute relative lg:top-0 lg:right-10">
              <Image
                src="/hero.png"
                alt="Hero Image"
                width={620}
                height={800}
                className="lg:min-h-[90vh]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
