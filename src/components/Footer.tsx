/** @format */

"use client";

import Link from "next/link";
import { Twitter, Mail, Building2, Shield } from "lucide-react";

/**
 * Global Footer Component.
 * Contains site map, social links, and legal information.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Navigation Links
  const links = {
    product: ["How It Works", "Features", "Pricing"],
    company: ["About", "Blog", "Careers", "Contact"],
    legal: ["Privacy", "Terms", "Compliance"],
  };

  // Social Media Links
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/stratadeed", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@stratadeed.com", label: "Email" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 to-slate-950 text-gray-300">
      
      {/* =========================================
          Background Effects
      ========================================= */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      
      {/* =========================================
          Main Content
      ========================================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">StrataDeed</h2>
                  <p className="text-sm text-cyan-300 font-medium">Real Estate Tokenization</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Transforming real estate ownership through blockchain technology. 
                Secure, transparent, and accessible digital property assets.
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-all hover:scale-105 border border-white/10"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <Shield className="w-4 h-4" />
                  <span>Secured by Blockchain</span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3">
                {links.product.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                {links.company.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-300">
                  © {currentYear} StrataDeed. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Real Estate • Blockchain • Innovation
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6">
                {links.legal.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors font-medium"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}