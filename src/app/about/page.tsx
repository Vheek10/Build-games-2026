/** @format */
"use client";

import {
  Building2,
  Shield,
  Globe,
  Users,
  Target,
  Eye,
  Zap,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Lock,
  TrendingUp,
  Home,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable property records on distributed ledger technology",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "blue",
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Borderless real estate investment opportunities",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "emerald",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built for investors, property owners, and developers",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "amber",
    },
    {
      icon: Zap,
      title: "Instant Transactions",
      description: "Near-instant property transfers and settlements",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "violet",
    },
  ];

  const stats = [
    { 
      value: "MVP", 
      label: "Active Prototype",
      description: "Live demonstration platform",
      icon: Home,
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      value: "2024", 
      label: "Founded",
      description: "Next-gen real estate platform",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      value: "100%", 
      label: "Secure",
      description: "Blockchain verified transactions",
      icon: Lock,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    { 
      value: "45+", 
      label: "Countries",
      description: "Global regulatory compliance",
      icon: Globe,
      image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
  ];

  const visionStats = [
    { 
      value: "$2.5B+", 
      label: "Target Market",
      description: "Tokenization potential",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w-400&q=80"
    },
    { 
      value: "100K+", 
      label: "Target Users",
      description: "Global investor reach",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w-400&q=80"
    },
    { 
      value: "<2s", 
      label: "Transactions",
      description: "Average processing time",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w-400&q=80"
    },
    { 
      value: "0", 
      label: "Disputes",
      description: "Immutable title records",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w-400&q=80"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Modern city skyline"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/70 to-cyan-900/70" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30">
                <Building2 className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">
                  ABOUT STRATADEED
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Redefining{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
                  Real Estate
                </span>
                <br />
                Ownership
              </h1>

              <p className="text-base sm:text-lg text-blue-100 mb-6 sm:mb-8 leading-relaxed">
                StrataDeed transforms traditional property ownership into
                secure, transparent, and accessible digital assets using
                blockchain technology.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/signup"
                  className="group inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center text-sm sm:text-base"
                >
                  Contact Team
                </Link>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-8 lg:mb-0">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="group relative bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-white/20 overflow-hidden hover:border-white/30 transition-all duration-300 hover:scale-105"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={stat.image}
                        alt={stat.label}
                        fill
                        className="object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-blue-200 font-medium">
                        {stat.label}
                      </div>
                      <div className="mt-1 text-xs text-blue-300/80 line-clamp-1">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-20">
            {/* Image */}
            <div className="relative aspect-square rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                alt="Secure commercial building architecture"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Secure commercial property architecture
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
                <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  OUR MISSION
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Building the Future of Property Ownership
              </h2>

              <div className="space-y-4 mb-6">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  StrataDeed demonstrates how property deeds can be tokenized, listed,
                  and transacted using secure blockchain infrastructure. Our platform
                  bridges traditional real estate with digital innovation.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <span className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                  Live prototype | Active development | Real-world testing
                </span>
              </div>
            </div>
          </div>

          {/* Features Grid with Images */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-20">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                emerald: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
                amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
                violet: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
              };

              return (
                <div
                  key={feature.title}
                  className="group relative overflow-hidden rounded-xl lg:rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Card Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Icon Overlay */}
                    <div className={`absolute top-4 left-4 p-2 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses].split(' ')[0]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 bg-white dark:bg-gray-800">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vision Section */}
          <div className="bg-gradient-to-br from-gray-900 to-black dark:from-gray-800 dark:to-gray-900 rounded-xl lg:rounded-2xl p-6 lg:p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FFFF' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 rounded-full mb-6 border border-cyan-500/30">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-300">
                    OUR VISION
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6">
                  A World Where Property Ownership is{" "}
                  <span className="text-cyan-300">Accessible to All</span>
                </h3>

                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
                  We envision a future where anyone, anywhere can invest in
                  verified real estate through secure digital tokens,
                  democratizing property ownership for the digital age.
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <span className="text-cyan-200 font-medium text-sm sm:text-base">
                    Join us in building this future
                  </span>
                </div>
              </div>

              {/* Vision Stats with Images */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {visionStats.map((stat, index) => (
                  <div 
                    key={index}
                    className="group relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={stat.image}
                        alt={stat.label}
                        fill
                        className="object-cover opacity-10 group-hover:opacity-15 transition-opacity duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-cyan-200 font-medium mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-cyan-300/80">
                        {stat.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 lg:mt-20 text-center">
            <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg sm:rounded-2xl mb-6 sm:mb-8 max-w-2xl mx-auto">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                Ready to experience the future of real estate?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                <span>Start Investing</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-5 sm:px-8 py-2.5 sm:py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}