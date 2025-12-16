"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

import { Loader2 } from "lucide-react";

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
  if (!isConnected) {
    // Ideally we should use useEffect for navigation, but during render if we return null it works as a guard
    // We'll use an effect to trigger the push to avoid hydration errors or render loops
    return <AuthRedirect />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
}

function AuthRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/signin");
  }, [router]);

  return null;
}
