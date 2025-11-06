/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	// ✅ Enable App Router if you use it (Next.js 13+)
	experimental: {
		appDir: false,
	},

	// ✅ Allow images from your Convex storage or any external CDN
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '.convex.cloud',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
		],
	},

	// ✅ Handle environment variables safely during build
	env: {
		NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
	},

	// ✅ Optional: silence TypeScript build errors (use only if they block builds)
	typescript: {
		ignoreBuildErrors: false,
	},

	// ✅ Optional: silence ESLint errors (for clean Vercel builds)
	eslint: {
		ignoreDuringBuilds: false,
	},
};

export default nextConfig;
