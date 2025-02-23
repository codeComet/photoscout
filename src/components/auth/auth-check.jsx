"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCheck({ routeIfAuthenticated = "/search", routeIfNotAuthenticated = "/" }) {
  const router = useRouter();

  useEffect(() => {
    const hasApiKeys = Object.keys(localStorage).some((key) =>
      key.startsWith("apiKey_")
    );
    if (!hasApiKeys) {
      router.push(routeIfNotAuthenticated);
    } else {
      router.push(routeIfAuthenticated);
    }
  }, [router]);

  return null;
}
