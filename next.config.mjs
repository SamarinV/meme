/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['preview.redd.it'],
	},
	output: 'export',
	basePath: '/meme',
	assetPrefix: '/meme/',
};

export default nextConfig;
