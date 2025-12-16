"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { Loader2 } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isConnected, isReconnecting } = useAccount();
  const router = useRouter();

  // If wallet is attempting to reconnect, show loader
  if (isReconnecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-sm text-gray-500 font-medium">Verifying wallet...</p>
        </div>
      </div>
    );
  }

  // If simple checks fail (not connected and not reconnecting), redirect
  // If simple checks fail (not connected and not reconnecting), show connect prompt
  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
             {/* We need to import Wallet icon here or use a span */}
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Connect Wallet to Access
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400">
            This page requires a connected wallet. Please connect your wallet to verify your identity and continue.
          </p>

          <div className="flex justify-center pt-4">
             {/* Using RainbowKit Connect Button here would be ideal, but we can't easily import ConnectButton if this is a server component? No, AuthGuard is "use client" */}
             {/* We need to import ConnectButton at the top first if we want to use it. */}
             <AuthGuardConnectButton />
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}



function AuthGuardConnectButton() {
  return (
      <ConnectButton.Custom>
        {({ openConnectModal, mounted }) => {
            if (!mounted) return null;
            return (
                <button
                    onClick={openConnectModal}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                    Connect Wallet
                </button>
            );
        }}
    </ConnectButton.Custom>
  );
}
