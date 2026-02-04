/** @format */

"use client";

import * as React from "react";

export function Web3Provider({ children }: { children: React.ReactNode }) {
	// Deprecated Mantle/Wagmi provider kept for backward compatibility.
	// All new Sui integrations should use SuietProvider from `@/providers/suiet-provider`.
	return <>{children}</>;
}

