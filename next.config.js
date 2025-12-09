/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	reactStrictMode: true,

	// Disable Turbopack entirely - this is the most reliable fix
	// Turbopack has issues with certain Node.js modules
	experimental: {
		turbo: false,
	},

	webpack: (config, { isServer, dev }) => {
		// Client-specific configurations
		if (!isServer) {
			config.resolve.fallback = {
				fs: false,
				path: false,
				os: false,
				crypto: require.resolve("crypto-browserify"),
				stream: require.resolve("stream-browserify"),
				http: false,
				https: false,
				zlib: false,
				net: false,
				tls: false,
				child_process: false,
				worker_threads: false,
			};
		}

		// Ignore problematic modules and test files
		config.module.rules.push({
			test: /[\\/]node_modules[\\/](thread-stream|pino)[\\/].*\.(js|ts|mjs)$/,
			use: "ignore-loader",
		});

		return config;
	},
};

module.exports = nextConfig;
