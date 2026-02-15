/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	reactStrictMode: true,

	// Production optimizations
	compress: true,
	poweredByHeader: false,
	optimizeFonts: true,

	// Add image configuration for external domains
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
		],
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 60,
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},

	// Enable SWC minification (faster than Terser)
	swcMinify: true,

	// Compiler optimizations
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},

	webpack: (config, { isServer, dev, webpack }) => {
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
			// Note: webpack is provided by Next.js in the options object
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

		// Ignore specific problematic packages
		config.plugins.push(
			new webpack.IgnorePlugin({
				resourceRegExp: /^@gemini-wallet\/core$/,
			}),
			new webpack.IgnorePlugin({
				resourceRegExp: /^porto(\/internal)?$/,
			}),
			new webpack.IgnorePlugin({
				resourceRegExp: /^@react-native-async-storage\/async-storage$/,
			}),
		);

		return config;
	},
};

export default nextConfig;
