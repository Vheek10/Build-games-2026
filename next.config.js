/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	reactStrictMode: true,
	
	// Add image configuration for external domains
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
		],
	},

	webpack: (config, { isServer, dev }) => {
		// Client-specific configurations
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				path: false,
				os: false,
				crypto: false,
				stream: false,
				http: false,
				https: false,
				zlib: false,
				net: false,
				tls: false,
				child_process: false,
				worker_threads: false,
			};

			// Use IgnorePlugin to completely ignore problematic packages
			const webpack = require("webpack");
			config.plugins.push(
				new webpack.IgnorePlugin({
					resourceRegExp: /^thread-stream$/,
					contextRegExp: /node_modules/,
				}),
			);
		}

		// Exclude test files from all packages
		config.module.rules.push({
			test: /\.(test|spec)\.(js|ts|mjs)$/,
			exclude: /node_modules/,
			use: "ignore-loader",
		});



		// Specifically ignore thread-stream test files
		config.module.rules.push({
			test: /[\\/]thread-stream[\\/].*[\\/]test[\\/]/,
			use: "ignore-loader",
		});

		// Also ignore markdown, license, and other non-js files
		config.module.rules.push({
			test: /\.(md|yml|sh|zip)$/,
			use: "ignore-loader",
		});


		// Ignore specific viem test files that are causing re-export errors
		const webpack = require("webpack");
		config.plugins.push(

			new webpack.IgnorePlugin({
				resourceRegExp: /^@gemini-wallet\/core$/,
			}),
			new webpack.IgnorePlugin({
				resourceRegExp: /^porto(\/internal)?$/,
			}),
			new webpack.IgnorePlugin({
				resourceRegExp: /^@react-native-async-storage\/async-storage$/,
			})
		);

		return config;
	},
};

module.exports = nextConfig;