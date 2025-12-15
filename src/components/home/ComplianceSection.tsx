/** @format */
"use client";

import {
  FileCheck,
  Shield,
  Globe,
  CheckCircle,
  Lock,
  Users,
  ArrowRight,
  Zap,
  Database,
  Building,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

// Simplified real estate images
const REAL_ESTATE_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    alt: "Modern transparent building representing transparency",
    category: "Transparency",
  },
  {
    url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    alt: "Secure commercial building with clean architectural lines",
    category: "Security",
  },
  {
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    alt: "Blockchain technology network connections",
    category: "Technology",
  },
  {
    url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    alt: "Urban development with regulated construction",
    category: "Regulation",
  },
];

const complianceFeatures = [
  {
    icon: FileCheck,
    title: "Document Verification",
    description: "Automated checks against global registries",
    metric: "100% Verified",
    color: "blue",
    imageIndex: 0,
  },
  {
    icon: Shield,
    title: "Smart Contract Security",
    description: "Escrow-protected multi-signature transactions",
    metric: "Zero Disputes",
    color: "emerald",
    imageIndex: 1,
  },
  {
    icon: Database,
    title: "Blockchain Records",
    description: "Permanent, tamper-proof transaction history",
    metric: "24/7 Audit Trail",
    color: "indigo",
    imageIndex: 2,
  },
  {
    icon: Globe,
    title: "Global Compliance",
    description: "Adherence to international regulations",
    metric: "45+ Countries",
    color: "cyan",
    imageIndex: 3,
  },
];

export default function ComplianceSection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [progressAnimations, setProgressAnimations] = useState({
    transactionSpeed: 0,
    verificationRate: 0,
    globalReach: 0,
    securityUptime: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressAnimations({
        transactionSpeed: 95,
        verificationRate: 100,
        globalReach: 90,
        securityUptime: 99.9,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const currentImage =
    REAL_ESTATE_IMAGES[complianceFeatures[activeFeature].imageIndex];

  // Fixed color classes to avoid dynamic template strings
  const getFeatureButtonClasses = (index) => {
    const isActive = activeFeature === index;
    const feature = complianceFeatures[index];
    
    if (isActive) {
      switch(feature.color) {
        case 'blue':
          return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
        case 'emerald':
          return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
        case 'indigo':
          return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800';
        case 'cyan':
          return 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800';
        default:
          return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800';
      }
    }
    return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700';
  };

  const getIconClasses = (index) => {
    const isActive = activeFeature === index;
    const feature = complianceFeatures[index];
    
    if (isActive) {
      switch(feature.color) {
        case 'blue':
          return 'text-blue-600 dark:text-blue-400';
        case 'emerald':
          return 'text-emerald-600 dark:text-emerald-400';
        case 'indigo':
          return 'text-indigo-600 dark:text-indigo-400';
        case 'cyan':
          return 'text-cyan-600 dark:text-cyan-400';
        default:
          return 'text-blue-600 dark:text-blue-400';
      }
    }
    return 'text-gray-500';
  };

  const getIconBgClasses = (index) => {
    const isActive = activeFeature === index;
    const feature = complianceFeatures[index];
    
    if (isActive) {
      switch(feature.color) {
        case 'blue':
          return 'bg-blue-500/10';
        case 'emerald':
          return 'bg-emerald-500/10';
        case 'indigo':
          return 'bg-indigo-500/10';
        case 'cyan':
          return 'bg-cyan-500/10';
        default:
          return 'bg-blue-500/10';
      }
    }
    return 'bg-gray-100 dark:bg-gray-700';
  };

  const getMetricIconClasses = (color) => {
    switch(color) {
      case 'blue':
        return 'text-blue-600 dark:text-blue-400';
      case 'emerald':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'cyan':
        return 'text-cyan-600 dark:text-cyan-400';
      case 'violet':
        return 'text-violet-600 dark:text-violet-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  const getMetricBgClasses = (color) => {
    switch(color) {
      case 'blue':
        return 'bg-blue-100 dark:bg-blue-900/30';
      case 'emerald':
        return 'bg-emerald-100 dark:bg-emerald-900/30';
      case 'cyan':
        return 'bg-cyan-100 dark:bg-cyan-900/30';
      case 'violet':
        return 'bg-violet-100 dark:bg-violet-900/30';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30';
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4 sm:mb-6">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              COMPLIANCE BUILT-IN
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Engineered for{" "}
            <span className="text-blue-600 dark:text-blue-400">Compliance</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Built around global regulations from day one. Every transaction
            meets the highest standards of security and compliance.
          </p>
        </div>

        {/* Feature Navigation - Fixed for mobile */}
        <div className="mb-8">
          <div className="flex overflow-x-auto gap-2 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {complianceFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.title}
                  onClick={() => setActiveFeature(index)}
                  className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-lg whitespace-nowrap transition-all min-w-fit ${getFeatureButtonClasses(index)}`}
                >
                  <div className={`p-2 rounded-lg ${getIconBgClasses(index)}`}>
                    <Icon className={`w-4 h-4 ${getIconClasses(index)}`} />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{feature.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {feature.metric}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Image */}
          <div className="relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden">
            <Image
              src={currentImage.url}
              alt={currentImage.alt}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Image Badge */}
            <div className="absolute top-4 left-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-sm text-white font-medium">
                  {currentImage.category}
                </div>
              </div>
            </div>

            {/* Metric Badge */}
            <div className="absolute bottom-4 right-4">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  {complianceFeatures[activeFeature].metric}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {complianceFeatures[activeFeature].title}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                  {complianceFeatures[activeFeature].description}
                </p>
              </div>

              {/* Feature Details */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Automated validation processes</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Real-time monitoring and alerts</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base">Complete audit trail</span>
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex items-center gap-2 pt-2">
                {complianceFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeFeature
                        ? 'bg-blue-500 scale-125'
                        : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
                    }`}
                    aria-label={`View ${complianceFeatures[index].title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Industry-Leading Performance
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
              Setting new standards with measurable results across every metric
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Zap,
                label: "Transaction Speed",
                value: "< 2s",
                description: "Average processing time",
                color: "blue",
                progress: progressAnimations.transactionSpeed,
              },
              {
                icon: CheckCircle,
                label: "Verification Rate",
                value: "100%",
                description: "Successful document verification",
                color: "emerald",
                progress: progressAnimations.verificationRate,
              },
              {
                icon: Users,
                label: "Global Reach",
                value: "45+",
                description: "Countries supported",
                color: "cyan",
                progress: progressAnimations.globalReach,
              },
              {
                icon: Lock,
                label: "Security Uptime",
                value: "99.99%",
                description: "System reliability",
                color: "violet",
                progress: progressAnimations.securityUptime,
              },
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="group relative p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Icon */}
                  <div className={`inline-flex p-2 sm:p-3 rounded-lg ${getMetricBgClasses(metric.color)} mb-3 sm:mb-4`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${getMetricIconClasses(metric.color)}`} />
                  </div>

                  {/* Value */}
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {metric.value}
                  </div>

                  {/* Label */}
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {metric.label}
                  </div>

                  {/* Description */}
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                    {metric.description}
                  </div>

                  {/* Progress Bar */}
                  <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-400 rounded-full transition-all duration-1000`}
                      style={{ width: `${metric.progress}%` }}
                    />
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl" />
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl mb-4 sm:mb-6">
              <Building className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 dark:text-white">
                This isn't a shortcut. It's an upgrade for the entire value chain.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg group text-sm sm:text-base">
              <span>Explore Compliance Framework</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-md text-sm sm:text-base">
              Schedule Compliance Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}