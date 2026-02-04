module stratadeed::property {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use std::string::String;

    /// Represents a tokenized real estate property on Sui
    public struct Property has key, store {
        id: UID,
        title: String,
        location: String,
        valuation: u64,
        total_tokens: u64,
        tokens_available: u64,
        owner: address,
    }

    /// Represents an ownership token for a property
    public struct PropertyToken has key, store {
        id: UID,
        property_id: address,
        tokens: u64,
        owner: address,
    }

    /// Create a new tokenized property
    public fun create_property(
        title: String,
        location: String,
        valuation: u64,
        total_tokens: u64,
        ctx: &mut TxContext,
    ): Property {
        let id = object::new(ctx);
        let owner = tx_context::sender(ctx);
        
        Property {
            id,
            title,
            location,
            valuation,
            total_tokens,
            tokens_available: total_tokens,
            owner,
        }
    }

    /// Mint tokens for a property
    public fun mint_property_token(
        property: &Property,
        tokens: u64,
        ctx: &mut TxContext,
    ): PropertyToken {
        let id = object::new(ctx);
        let owner = tx_context::sender(ctx);
        
        PropertyToken {
            id,
            property_id: object::id_to_address(&property.id),
            tokens,
            owner,
        }
    }

    /// Get property details
    public fun get_property_info(property: &Property): (String, String, u64, u64) {
        (property.title, property.location, property.valuation, property.total_tokens)
    }

    /// Transfer property token to another address
    public fun transfer_token(token: PropertyToken, to: address, _ctx: &mut TxContext) {
        transfer::public_transfer(token, to);
    }
}
