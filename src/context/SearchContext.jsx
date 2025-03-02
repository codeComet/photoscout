"use client";

import { createContext, useContext, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

const SearchContext = createContext();

// Create a wrapper component that uses useSearchParams
const SearchProviderInner = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || "");
  const [selectedServices, setSelectedServices] = useState(
    searchParams.get('services')?.split(',').filter(Boolean) || []
  );
  const [services, setServices] = useState([]);
  const [filterParams, setFilterParams] = useState(() => ({
    width: "",
    height: "",
    quality: "",
    orientation: "",
    page: 1,
  }));

  // Update URL only when there are actual search parameters
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Only add parameters if they have values
    if (query) params.set('q', query);
    if (selectedServices.length > 0) params.set('services', selectedServices.join(','));
    if (filterParams.width) params.set('width', filterParams.width);
    if (filterParams.height) params.set('height', filterParams.height);
    if (filterParams.quality) params.set('quality', filterParams.quality);
    if (filterParams.orientation) params.set('orientation', filterParams.orientation);
    
    // Only add page parameter if we're beyond page 1 and there's a search query
    if (filterParams.page > 1 && query) params.set('page', filterParams.page);

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    router.push(newUrl);
  }, [query, selectedServices, filterParams, router]);

  useEffect(() => {
    localStorage.setItem("filterParams", JSON.stringify(filterParams));
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

// Wrap the inner provider with Suspense
export const SearchProvider = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchProviderInner>{children}</SearchProviderInner>
    </Suspense>
  );
};

export function useSearch() {
    const context = useContext(SearchContext);
    if(!context){
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}
