/** @format */

/**
 * Property Storage Utility
 * Manages localStorage persistence for minted properties
 */

const STORAGE_KEY = "stratadeed_minted_properties";

export interface Property {
	id: number;
	title: string;
	description: string;
	location: string;
	price: number;
	bedrooms: number;
	bathrooms: number;
	squareFeet: number;
	capacity: number;
	views: number;
	isFeatured: boolean;
	country: string;
	createdAt: string;
	type: string;
	rating?: number;
	investmentReturn?: number;
	image?: string;
	// Minted property specific fields
	isMinted?: boolean;
	txHash?: string;
	tokenId?: string;
	metadataURI?: string;
	propertyType?: string;
}

/**
 * Save a newly minted property to localStorage
 */
export function saveProperty(property: Property): void {
	try {
		const existing = getMintedProperties();
		const updated = [property, ...existing];
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
		console.log("Property saved to localStorage:", property.id);
	} catch (error) {
		console.error("Error saving property to localStorage:", error);
	}
}

/**
 * Get all minted properties from localStorage
 */
export function getMintedProperties(): Property[] {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return [];
		return JSON.parse(stored) as Property[];
	} catch (error) {
		console.error("Error reading properties from localStorage:", error);
		return [];
	}
}

/**
 * Get all properties (minted + sample data)
 * Minted properties appear first
 */
export function getAllProperties(sampleProperties: Property[]): Property[] {
	const minted = getMintedProperties();
	return [...minted, ...sampleProperties];
}

/**
 * Get a specific property by ID
 */
export function getPropertyById(
	id: number,
	sampleProperties: Property[],
): Property | undefined {
	const minted = getMintedProperties();
	const allProperties = [...minted, ...sampleProperties];
	return allProperties.find((p) => p.id === id);
}

/**
 * Clear all minted properties (for testing/debugging)
 */
export function clearMintedProperties(): void {
	try {
		localStorage.removeItem(STORAGE_KEY);
		console.log("Minted properties cleared from localStorage");
	} catch (error) {
		console.error("Error clearing properties from localStorage:", error);
	}
}

/**
 * Get the next available property ID
 */
export function getNextPropertyId(sampleProperties: Property[]): number {
	const allProperties = getAllProperties(sampleProperties);
	if (allProperties.length === 0) return 1;
	const maxId = Math.max(...allProperties.map((p) => p.id));
	return maxId + 1;
}
