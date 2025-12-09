/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
	experimental: {
		turbopack: false,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "picsum.photos",
			},
			{
				protocol: "https",
				hostname: "source.unsplash.com",
			},
		],
	},
};

module.exports = nextConfig;
