/** @format */

// utils/realEstateImages.ts
const REAL_ESTATE_IMAGE_CATEGORIES = {
	MODERN_BUILDINGS: "modern-buildings",
	INTERIORS: "interiors",
	APARTMENTS: "apartments",
	LUXURY_HOMES: "luxury-homes",
	CITYSCAPES: "cityscapes",
	BLOCKCHAIN_TECH: "blockchain-tech",
	OFFICE_SPACES: "office-spaces",
	ARCHITECTURE: "architecture",
	CONSTRUCTION: "construction",
	SUSTAINABLE: "sustainable",
} as const;

export type ImageCategory =
	(typeof REAL_ESTATE_IMAGE_CATEGORIES)[keyof typeof REAL_ESTATE_IMAGE_CATEGORIES];

export interface RealEstateImage {
	id: string;
	url: string;
	alt: string;
	category: ImageCategory;
	tags: string[];
	photographer?: string;
	width: number;
	height: number;
	unsplashId?: string;
}

// Enhanced curated real estate images from Unsplash
export const REAL_ESTATE_IMAGES: RealEstateImage[] = [
	// Modern Buildings & Architecture
	{
		id: "modern-building-1",
		url: "/images/unsplash-ce09059eeffa.jpg",
		alt: "Modern skyscraper with glass facade in city center",
		category: REAL_ESTATE_IMAGE_CATEGORIES.MODERN_BUILDINGS,
		tags: ["architecture", "skyscraper", "modern", "glass", "urban"],
		photographer: "Joe Roe",
		width: 2000,
		height: 1333,
		unsplashId: "ce09059eeffa",
	},
	{
		id: "modern-building-2",
		url: "/images/unsplash-cc1a3fa10c00.jpg",
		alt: "Contemporary apartment building with clean architectural lines",
		category: REAL_ESTATE_IMAGE_CATEGORIES.MODERN_BUILDINGS,
		tags: ["apartment", "contemporary", "minimalist", "architecture"],
		photographer: "Max Bender",
		width: 2000,
		height: 1333,
		unsplashId: "cc1a3fa10c00",
	},
	{
		id: "modern-building-3",
		url: "/images/unsplash-f200968a6e72.jpg",
		alt: "Urban residential building with geometric balconies",
		category: REAL_ESTATE_IMAGE_CATEGORIES.MODERN_BUILDINGS,
		tags: ["urban", "residential", "balcony", "modern"],
		photographer: "Scott Webb",
		width: 2000,
		height: 1333,
		unsplashId: "f200968a6e72",
	},
	{
		id: "modern-building-4",
		url: "/images/unsplash-c627a92ad1ab.jpg",
		alt: "Glass office tower reflecting blue sky",
		category: REAL_ESTATE_IMAGE_CATEGORIES.MODERN_BUILDINGS,
		tags: ["office", "glass", "reflection", "commercial"],
		photographer: "Tom Rumble",
		width: 2000,
		height: 1333,
		unsplashId: "c627a92ad1ab",
	},
	{
		id: "modern-building-5",
		url: "/images/unsplash-8bab748fbf90.jpg",
		alt: "Modern condominium complex with sustainable design",
		category: REAL_ESTATE_IMAGE_CATEGORIES.MODERN_BUILDINGS,
		tags: ["condo", "sustainable", "complex", "green"],
		photographer: "Andrew Neel",
		width: 2000,
		height: 1333,
		unsplashId: "8bab748fbf90",
	},

	// Luxury Homes & Interiors
	{
		id: "luxury-interior-1",
		url: "/images/unsplash-707ba9348227.jpg",
		alt: "Luxury living room with floor-to-ceiling windows and designer furniture",
		category: REAL_ESTATE_IMAGE_CATEGORIES.INTERIORS,
		tags: ["luxury", "living-room", "furniture", "design", "modern"],
		photographer: "R ARCHITECTURE",
		width: 2000,
		height: 1333,
		unsplashId: "707ba9348227",
	},
	{
		id: "luxury-interior-2",
		url: "/images/unsplash-ae9021a400a0.jpg",
		alt: "Modern kitchen with marble countertops and high-end appliances",
		category: REAL_ESTATE_IMAGE_CATEGORIES.INTERIORS,
		tags: ["kitchen", "modern", "appliances", "luxury", "marble"],
		photographer: "Katarzyna Bialasiewicz",
		width: 2000,
		height: 1333,
		unsplashId: "ae9021a400a0",
	},
	{
		id: "luxury-interior-3",
		url: "/images/unsplash-3dadae4b4ace.jpg",
		alt: "Elegant bedroom with luxury bedding and minimalist decor",
		category: REAL_ESTATE_IMAGE_CATEGORIES.INTERIORS,
		tags: ["bedroom", "elegant", "minimalist", "luxury", "design"],
		photographer: "Alexandra Gorn",
		width: 2000,
		height: 1333,
		unsplashId: "3dadae4b4ace",
	},
	{
		id: "luxury-interior-4",
		url: "/images/unsplash-14819c35db37.jpg",
		alt: "Spa-like bathroom with natural stone and modern fixtures",
		category: REAL_ESTATE_IMAGE_CATEGORIES.INTERIORS,
		tags: ["bathroom", "spa", "luxury", "stone", "modern"],
		photographer: "Phillip Goldsberry",
		width: 2000,
		height: 1333,
		unsplashId: "14819c35db37",
	},
	{
		id: "luxury-interior-5",
		url: "/images/unsplash-f24b0cae1224.jpg",
		alt: "Open concept living area with panoramic views",
		category: REAL_ESTATE_IMAGE_CATEGORIES.INTERIORS,
		tags: ["open-concept", "views", "luxury", "spacious", "design"],
		photographer: "Spacejoy",
		width: 2000,
		height: 1333,
		unsplashId: "f24b0cae1224",
	},

	// Blockchain Technology & Digital
	{
		id: "blockchain-tech-1",
		url: "/images/unsplash-d088224ddc74.jpg",
		alt: "Blockchain network visualization with interconnected digital nodes",
		category: REAL_ESTATE_IMAGE_CATEGORIES.BLOCKCHAIN_TECH,
		tags: ["blockchain", "network", "digital", "tech", "innovation"],
		photographer: "Mikhail Pavstyuk",
		width: 2000,
		height: 1333,
		unsplashId: "d088224ddc74",
	},
	{
		id: "blockchain-tech-2",
		url: "/images/unsplash-074b7f938ba0.jpg",
		alt: "Digital dashboard showing real-time analytics and data visualization",
		category: REAL_ESTATE_IMAGE_CATEGORIES.BLOCKCHAIN_TECH,
		tags: ["dashboard", "analytics", "data", "visualization", "tech"],
		photographer: "Luke Chesser",
		width: 2000,
		height: 1333,
		unsplashId: "074b7f938ba0",
	},
	{
		id: "blockchain-tech-3",
		url: "/images/unsplash-e363dbe005cb.jpg",
		alt: "Abstract digital connections representing blockchain network infrastructure",
		category: REAL_ESTATE_IMAGE_CATEGORIES.BLOCKCHAIN_TECH,
		tags: ["abstract", "network", "connections", "digital", "infrastructure"],
		photographer: "Dan Cristian Pădureț",
		width: 2000,
		height: 1333,
		unsplashId: "e363dbe005cb",
	},
	{
		id: "blockchain-tech-4",
		url: "/images/unsplash-bebda4e38f71.jpg",
		alt: "Data center with servers and network infrastructure",
		category: REAL_ESTATE_IMAGE_CATEGORIES.BLOCKCHAIN_TECH,
		tags: [
			"data-center",
			"servers",
			"infrastructure",
			"technology",
			"security",
		],
		photographer: "Carlos Muza",
		width: 2000,
		height: 1333,
		unsplashId: "bebda4e38f71",
	},
	{
		id: "blockchain-tech-5",
		url: "/images/unsplash-80b023f02d71.jpg",
		alt: "Cryptographic security interface with digital key visualization",
		category: REAL_ESTATE_IMAGE_CATEGORIES.BLOCKCHAIN_TECH,
		tags: ["crypto", "security", "encryption", "digital", "keys"],
		photographer: "Markus Spiske",
		width: 2000,
		height: 1333,
		unsplashId: "80b023f02d71",
	},

	// Cityscapes & Urban Development
	{
		id: "cityscape-1",
		url: "/images/unsplash-67f85cf4f1df.jpg",
		alt: "City skyline at sunset with modern skyscrapers",
		category: REAL_ESTATE_IMAGE_CATEGORIES.CITYSCAPES,
		tags: ["city", "skyline", "urban", "development", "sunset"],
		photographer: "Luca Bravo",
		width: 2000,
		height: 1333,
		unsplashId: "67f85cf4f1df",
	},
	{
		id: "cityscape-2",
		url: "/images/unsplash-59a10b8d2000.jpg",
		alt: "Urban development with modern buildings and infrastructure",
		category: REAL_ESTATE_IMAGE_CATEGORIES.CITYSCAPES,
		tags: ["urban", "development", "city", "buildings", "infrastructure"],
		photographer: "Jonathan Kemper",
		width: 2000,
		height: 1333,
		unsplashId: "59a10b8d2000",
	},
	{
		id: "cityscape-3",
		url: "/images/unsplash-07fb3b4ae5f1.jpg",
		alt: "Aerial view of city with organized urban planning",
		category: REAL_ESTATE_IMAGE_CATEGORIES.CITYSCAPES,
		tags: ["aerial", "urban-planning", "city", "development", "organization"],
		photographer: "Lukas Blazek",
		width: 2000,
		height: 1333,
		unsplashId: "07fb3b4ae5f1",
	},
	{
		id: "cityscape-4",
		url: "/images/unsplash-67cf0d13bc1b.jpg",
		alt: "Modern cityscape with clean architecture and green spaces",
		category: REAL_ESTATE_IMAGE_CATEGORIES.CITYSCAPES,
		tags: ["modern", "architecture", "green-spaces", "city", "clean"],
		photographer: "Matthew Henry",
		width: 2000,
		height: 1333,
		unsplashId: "67cf0d13bc1b",
	},
	{
		id: "cityscape-5",
		url: "/images/unsplash-8081e485255e.jpg",
		alt: "Urban development with mixed-use buildings and public spaces",
		category: REAL_ESTATE_IMAGE_CATEGORIES.CITYSCAPES,
		tags: ["mixed-use", "public-spaces", "urban", "development", "community"],
		photographer: "Josh Appel",
		width: 2000,
		height: 1333,
		unsplashId: "8081e485255e",
	},

	// Office Spaces
	{
		id: "office-space-1",
		url: "/images/unsplash-f200968a6e72.jpg",
		alt: "Modern co-working space with collaborative areas",
		category: REAL_ESTATE_IMAGE_CATEGORIES.OFFICE_SPACES,
		tags: ["coworking", "collaborative", "modern", "office", "workspace"],
		photographer: "Scott Webb",
		width: 2000,
		height: 1333,
		unsplashId: "f200968a6e72",
	},
	{
		id: "office-space-2",
		url: "/images/unsplash-37526070297c.jpg",
		alt: "Corporate office with ergonomic furniture and natural light",
		category: REAL_ESTATE_IMAGE_CATEGORIES.OFFICE_SPACES,
		tags: ["corporate", "ergonomic", "natural-light", "professional", "office"],
		photographer: "Scott Webb",
		width: 2000,
		height: 1333,
		unsplashId: "37526070297c",
	},

	// Sustainable Architecture
	{
		id: "sustainable-1",
		url: "/images/unsplash-8bab748fbf90.jpg",
		alt: "Green building with solar panels and sustainable features",
		category: REAL_ESTATE_IMAGE_CATEGORIES.SUSTAINABLE,
		tags: ["green-building", "solar", "sustainable", "eco-friendly", "energy"],
		photographer: "Andrew Neel",
		width: 2000,
		height: 1333,
		unsplashId: "8bab748fbf90",
	},
	{
		id: "sustainable-2",
		url: "/images/unsplash-bb926046304a.jpg",
		alt: "Building with green walls and natural ventilation",
		category: REAL_ESTATE_IMAGE_CATEGORIES.SUSTAINABLE,
		tags: [
			"green-walls",
			"natural-ventilation",
			"sustainable",
			"architecture",
			"eco",
		],
		photographer: "Omid Armin",
		width: 2000,
		height: 1333,
		unsplashId: "bb926046304a",
	},

	// Construction & Development
	{
		id: "construction-1",
		url: "/images/unsplash-d81bb19240f5.jpg",
		alt: "Construction site with modern equipment and safety measures",
		category: REAL_ESTATE_IMAGE_CATEGORIES.CONSTRUCTION,
		tags: ["construction", "development", "site", "safety", "progress"],
		photographer: "Scott Blake",
		width: 2000,
		height: 1333,
		unsplashId: "d81bb19240f5",
	},
	{
		id: "construction-2",
		url: "/images/unsplash-cc1a3fa10c00.jpg",
		alt: "Building under construction with structural framework visible",
		category: REAL_ESTATE_IMAGE_CATEGORIES.CONSTRUCTION,
		tags: [
			"construction",
			"framework",
			"structural",
			"development",
			"progress",
		],
		photographer: "Max Bender",
		width: 2000,
		height: 1333,
		unsplashId: "cc1a3fa10c00",
	},
];

// Utility functions
export const getImagesByCategory = (
	category: ImageCategory,
): RealEstateImage[] => {
	return REAL_ESTATE_IMAGES.filter((img) => img.category === category);
};

export const getRandomImage = (category?: ImageCategory): RealEstateImage => {
	const images = category ? getImagesByCategory(category) : REAL_ESTATE_IMAGES;
	const randomIndex = Math.floor(Math.random() * images.length);
	return images[randomIndex];
};

export const getImagesForSteps = (steps: any[]): RealEstateImage[] => {
	return steps.map((step, index) => {
		const categories = [
			REAL_ESTATE_IMAGE_CATEGORIES.MODERN_BUILDINGS,
			REAL_ESTATE_IMAGE_CATEGORIES.BLOCKCHAIN_TECH,
			REAL_ESTATE_IMAGE_CATEGORIES.CITYSCAPES,
			REAL_ESTATE_IMAGE_CATEGORIES.INTERIORS,
			REAL_ESTATE_IMAGE_CATEGORIES.OFFICE_SPACES,
		];
		const category = categories[index % categories.length];
		return getRandomImage(category);
	});
};

export const getImageById = (id: string): RealEstateImage | undefined => {
	return REAL_ESTATE_IMAGES.find((img) => img.id === id);
};

export const searchImages = (query: string): RealEstateImage[] => {
	const searchTerm = query.toLowerCase();
	return REAL_ESTATE_IMAGES.filter(
		(img) =>
			img.alt.toLowerCase().includes(searchTerm) ||
			img.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
			img.category.toLowerCase().includes(searchTerm),
	);
};

export const getFeaturedImages = (count: number = 6): RealEstateImage[] => {
	// Select diverse images from different categories
	const categories = [
		REAL_ESTATE_IMAGE_CATEGORIES.MODERN_BUILDINGS,
		REAL_ESTATE_IMAGE_CATEGORIES.INTERIORS,
		REAL_ESTATE_IMAGE_CATEGORIES.BLOCKCHAIN_TECH,
		REAL_ESTATE_IMAGE_CATEGORIES.CITYSCAPES,
		REAL_ESTATE_IMAGE_CATEGORIES.OFFICE_SPACES,
		REAL_ESTATE_IMAGE_CATEGORIES.SUSTAINABLE,
	];

	const featured: RealEstateImage[] = [];
	let categoryIndex = 0;

	while (featured.length < count && categoryIndex < categories.length) {
		const categoryImages = getImagesByCategory(categories[categoryIndex]);
		if (categoryImages.length > 0) {
			const randomImage = getRandomImage(categories[categoryIndex]);
			if (!featured.some((img) => img.id === randomImage.id)) {
				featured.push(randomImage);
			}
		}
		categoryIndex++;
	}

	// Fill remaining slots with random images
	while (featured.length < count) {
		const randomImage = getRandomImage();
		if (!featured.some((img) => img.id === randomImage.id)) {
			featured.push(randomImage);
		}
	}

	return featured;
};

// Image size presets for responsive design
export const IMAGE_SIZE_PRESETS = {
	THUMBNAIL: { width: 400, height: 267 },
	CARD: { width: 600, height: 400 },
	HERO: { width: 1920, height: 1080 },
	FULL: { width: 2000, height: 1333 },
};

// Generate responsive image URL
export const getResponsiveImageUrl = (
	image: RealEstateImage,
	size: keyof typeof IMAGE_SIZE_PRESETS = "CARD",
): string => {
	const { width, height } = IMAGE_SIZE_PRESETS[size];
	const baseUrl = image.url.split("?")[0];
	return `${baseUrl}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${width}&h=${height}&q=80`;
};

// Categories with descriptions
export const CATEGORY_DESCRIPTIONS: Record<ImageCategory, string> = {
	[REAL_ESTATE_IMAGE_CATEGORIES.MODERN_BUILDINGS]:
		"Contemporary architecture and innovative building designs",
	[REAL_ESTATE_IMAGE_CATEGORIES.INTERIORS]:
		"Luxury and modern interior spaces with premium finishes",
	[REAL_ESTATE_IMAGE_CATEGORIES.APARTMENTS]:
		"Residential apartment complexes and multi-family housing",
	[REAL_ESTATE_IMAGE_CATEGORIES.LUXURY_HOMES]:
		"Premium residential properties with exceptional amenities",
	[REAL_ESTATE_IMAGE_CATEGORIES.CITYSCAPES]:
		"Urban development and city infrastructure projects",
	[REAL_ESTATE_IMAGE_CATEGORIES.BLOCKCHAIN_TECH]:
		"Digital innovation and blockchain technology visualization",
	[REAL_ESTATE_IMAGE_CATEGORIES.OFFICE_SPACES]:
		"Modern workspaces and commercial office environments",
	[REAL_ESTATE_IMAGE_CATEGORIES.ARCHITECTURE]:
		"Architectural design and structural innovation",
	[REAL_ESTATE_IMAGE_CATEGORIES.CONSTRUCTION]:
		"Development projects and construction progress",
	[REAL_ESTATE_IMAGE_CATEGORIES.SUSTAINABLE]:
		"Eco-friendly buildings and green architecture",
};
