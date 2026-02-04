/** @format */

import { SuiClient } from "@mysten/sui";

// Example Sui Move package + module identifiers.
// Replace these with your deployed package / module IDs.
export const PROPERTY_PACKAGE_ID =
	process.env.NEXT_PUBLIC_SUI_PROPERTY_PACKAGE_ID ||
	"0xPROPERTY_PACKAGE_ID";
export const PROPERTY_MODULE = "property_tokenization";

export interface SuiTokenizeInput {
	propertyId: string;
	metadataUrl: string;
	privateCommitment: string;
	ownerAddress: string;
	mintFee?: string;
}

export async function tokenizePropertyOnSui(
	client: SuiClient,
	walletAddress: string,
	{
		propertyId,
		metadataUrl,
		privateCommitment,
		ownerAddress,
		mintFee = "0",
	}: SuiTokenizeInput,
) {
	// This assumes a Move entry function with signature:
	// public entry fun mint_property(
	//   property_id: String,
	//   metadata_url: String,
	//   private_commitment: vector<u8>,
	//   owner: address,
	//   ctx: &mut TxContext
	// )

	const tx = await client.executeMoveCall({
		packageObjectId: PROPERTY_PACKAGE_ID,
		module: PROPERTY_MODULE,
		function: "mint_property",
		arguments: [propertyId, metadataUrl, privateCommitment, ownerAddress],
		sender: walletAddress,
		// For a free mint set gasBudget; for paid flows, attach coins via a
		// programmable transaction instead.
		gasBudget: Number(process.env.NEXT_PUBLIC_SUI_GAS_BUDGET || 50_000_000),
	});

	return tx;
}


