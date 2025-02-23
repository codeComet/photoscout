"use client";

import { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();

const initialFilters = JSON.parse(localStorage.getItem("filterParams")) || {
  width: "",
  height: "",
  quality: "100",
  orientation: "",
  page: 1,
};

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  const [filterParams, setFilterParams] = useState(initialFilters);

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
