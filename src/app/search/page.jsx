"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useSearch } from "@/context/SearchContext";
import { FilterDrawer } from "@/components/filter-drawer/FilterDrawer";
import { searchUnsplash } from "@/helpers/unsplash";
import Result from "./Result";

export default function SearchInput() {
  const {
    query,
    setQuery,
    selectedServices,
    services,
    setServices,
    filterParams,
    setFilterParams,
    handleServiceToggle,
  } = useSearch();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  // Load saved search results and state on initial render
  const savedResults =
    JSON.parse(localStorage.getItem("unsplash_search_results")) || [];
  const savedPage = localStorage.getItem("unsplash_current_page");
  const savedQuery = localStorage.getItem("unsplash_current_query");

  if (savedResults.length > 0 && savedQuery) {
    setImages(savedResults);
    setFilterParams((prev) => ({ ...prev, page: parseInt(savedPage) || 1 }));
    setQuery(savedQuery);
  }

  const serviceIds = Object.keys(localStorage)
    .filter((key) => key.startsWith("apiKey_"))
    .map((key) => key.replace("apiKey_", ""));

  setServices((prevServices) => [...new Set([...prevServices, ...serviceIds])]);
}, [setServices, setQuery, setFilterParams]); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.warning("Please enter a search query");
      return;
    }
    if (selectedServices.length === 0) {
      toast.warning("Please select at least one service");
      return;
    }

    setLoading(true);
    setImages([]);
    setFilterParams(prev => ({ ...prev, page: 1 }));

    // Clear previous search results and state from localStorage
    localStorage.removeItem('unsplash_search_results');
    localStorage.removeItem('unsplash_current_page');
    localStorage.removeItem('unsplash_current_query');

    try {
      for (const service of selectedServices) {
        toast.success(`Searching ${service} for: ${query}`);
        const apiKey = localStorage.getItem(`apiKey_${service}`);
        if (!apiKey) {
          toast.warning(`API key for ${service} is not set`);
          continue;
        }
        
        if (service === "unsplash") {
          const results = await searchUnsplash(query, 1, filterParams);
          toast.success(`Showing ${results.results.length} results from ${service}`);
          setImages(results.results);
          
          // Save state to localStorage
          localStorage.setItem('unsplash_search_results', JSON.stringify(results.results));
          localStorage.setItem('unsplash_current_page', '1');
          localStorage.setItem('unsplash_current_query', query);
        }
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

const handleLoadMore = async () => {
  setLoading(true);
  try {
    for (const service of selectedServices) {
      const apiKey = localStorage.getItem(`apiKey_${service}`);
      if (!apiKey) {
        toast.warning(`API key for ${service} is not set`);
        continue;
      }

      if (service === "unsplash") {
        const nextPage = filterParams.page + 1;
        const results = await searchUnsplash(query, nextPage, filterParams);

        // Retrieve stored images
        const existingImages = JSON.parse(
          localStorage.getItem("unsplash_search_results") || "[]"
        );

        // Append new images to the existing ones
        const newImages = [...existingImages, ...results.results];

        setImages(newImages);
        setFilterParams((prev) => ({ ...prev, page: nextPage }));

        // Save the updated images list and page number in localStorage
        localStorage.setItem(
          "unsplash_search_results",
          JSON.stringify(newImages)
        );
        localStorage.setItem("unsplash_current_page", nextPage.toString());
      }
    }
  } catch (error) {
    toast.error(`Error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen w-full px-5 py-12 [background:radial-gradient(125%_125%_at_50%_10%,#0a0f18_40%,#17A34A_100%)] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center mb-5">
        <h3 className="mb-4 text-2xl font-semibold">Search by keyword</h3>
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Beach, Dogs, Sunset, Cats etc..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-16 pr-4 py-8 text-xl rounded-full border-2 border-gray-300 focus:border-[#17A34A] focus:ring-2 focus:ring-[#17A34A] focus:outline-none"
            />
            <Search
              className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
          </div>
          <div className="mt-5 flex gap-5 items-center justify-center">
            <p className="mb-0">Get images from: </p>
            <div className="flex flex-wrap gap-5">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={service}
                    checked={selectedServices.includes(service)}
                    onCheckedChange={() => handleServiceToggle(service)}
                    color="#17A34A"
                  />
                  <label
                    htmlFor={service}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {service}
                  </label>
                </div>
              ))}
              <div className="cursor-pointer">
                <FilterDrawer />
              </div>
            </div>
          </div>
          <div>
            <Button
              type="submit"
              disabled={loading}
              className="mt-5 w-full bg-white text-black hover:text-white py-6 rounded-full hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </form>
      </div>
      <Result images={images} loading={loading}/>

      {/* Load More */}
      <div>
        {images.length > 0 && (
          <Button
            type="button"
            className="mt-5 w-full bg-white text-black hover:text-white py-6 rounded-full hover:bg-green-600 disabled:opacity-50"
            onClick={() => handleLoadMore()}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
