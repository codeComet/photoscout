"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  Suspense,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";

const SearchContext = createContext();

const SearchProviderInner = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedServices, setSelectedServices] = useState(
    searchParams.get("services")?.split(",").filter(Boolean) || []
  );
  const [services, setServices] = useState([]);

  // State for filter params, initially empty
  const [filterParams, setFilterParams] = useState({
    width: "",
    height: "",
    quality: "",
    orientation: "",
    page: 1,
  });

  // Restore from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedParams = localStorage.getItem("filterParams");
      if (savedParams) {
        setFilterParams(JSON.parse(savedParams));
      }
    }
  }, []);

  // Sync state with URL parameters on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    setSelectedServices(
      params.get("services")?.split(",").filter(Boolean) || []
    );
    setFilterParams({
      width: params.get("width") || "",
      height: params.get("height") || "",
      quality: params.get("quality") || "",
      orientation: params.get("orientation") || "",
      page: Number(params.get("page")) || 1,
    });
  }, []);

  // Update URL when state changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (selectedServices.length > 0)
      params.set("services", selectedServices.join(","));
    if (filterParams.width) params.set("width", filterParams.width);
    if (filterParams.height) params.set("height", filterParams.height);
    if (filterParams.quality) params.set("quality", filterParams.quality);
    if (filterParams.orientation)
      params.set("orientation", filterParams.orientation);
    if (filterParams.page > 1) params.set("page", filterParams.page);

    const newUrl = `${window.location.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;

    if (newUrl !== window.location.pathname + window.location.search) {
      router.push(newUrl, { scroll: false });
    }
  }, [query, selectedServices, filterParams]);

  // Store filterParams in localStorage after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("filterParams", JSON.stringify(filterParams));
    }
  }, [filterParams]);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        services,
        setServices,
        selectedServices,
        setSelectedServices,
        filterParams,
        setFilterParams,
        handleServiceToggle,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Wrap with Suspense for async handling
export const SearchProvider = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchProviderInner>{children}</SearchProviderInner>
    </Suspense>
  );
};

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
