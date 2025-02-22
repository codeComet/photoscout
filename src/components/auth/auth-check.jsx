"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCheck({ routeIfAuthenticated = "/search" }) {
  const router = useRouter();

  useEffect(() => {
    const hasApiKeys = Object.keys(localStorage).some((key) =>
      key.startsWith("apiKey_")
    );
    console.log(hasApiKeys);
    if (!hasApiKeys) {
      router.push("/");
    } else {
      router.push(routeIfAuthenticated);
    }
  }, [router]);

  return null;
}
