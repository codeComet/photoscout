"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams, useRouter } from 'next/navigation';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get('q') || "");
  const [selectedServices, setSelectedServices] = useState(
    searchParams.get('services')?.split(',').filter(Boolean) || []
  );
  const [services, setServices] = useState([]);
  const [filterParams, setFilterParams] = useState(() => {
    // Try to get filter params from URL first, then localStorage, then defaults
    const urlWidth = searchParams.get('width');
    const urlHeight = searchParams.get('height');
    const urlQuality = searchParams.get('quality');
    const urlOrientation = searchParams.get('orientation');
    
    return {
      width: urlWidth || "",
      height: urlHeight || "",
      quality: urlQuality || "75",
      orientation: urlOrientation || "",
      page: 1,
    };
  });

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (query) params.set('q', query);
    if (selectedServices.length > 0) params.set('services', selectedServices.join(','));
    if (filterParams.width) params.set('width', filterParams.width);
    if (filterParams.height) params.set('height', filterParams.height);
    if (filterParams.quality) params.set('quality', filterParams.quality);
    if (filterParams.orientation) params.set('orientation', filterParams.orientation);
    if (filterParams.page) params.set('page', filterParams.page);

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

export function useSearch() {
    const context = useContext(SearchContext);
    if(!context){
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
}
