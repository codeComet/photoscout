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
import { searchPexels } from "@/helpers/pexels";
import { searchPixabay } from "@/helpers/pixabay";
import Result from "./Result";
import AuthCheck from "@/components/auth/auth-check";
import { useRouter } from "next/navigation";

export default function SearchInput() {
const router = useRouter();

useEffect(() => {
  if (typeof window !== "undefined") {
    console.log("useEffect is running...");

    const hasApiKeys = Object.keys(localStorage).some((key) =>
      key.startsWith("apiKey_")
    );

    if (!hasApiKeys) {
      setTimeout(() => {
        router.push("/get-started");
      }, 100);
    }
  }
}, [router]);

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
    const savedUnsplashResults =
      JSON.parse(localStorage.getItem("unsplash_search_results")) || [];
    const savedPexelsResults =
      JSON.parse(localStorage.getItem("pexels_search_results")) || [];
    const savedPixabayResults =
      JSON.parse(localStorage.getItem("pixabay_search_results")) || [];

    const savedQuery =
      localStorage.getItem("unsplash_current_query") ||
      localStorage.getItem("pexels_current_query") ||
      localStorage.getItem("pixabay_current_query");

    if (
      (savedUnsplashResults.length > 0 ||
        savedPexelsResults.length > 0 ||
        savedPixabayResults.length > 0) &&
      savedQuery
    ) {
      setImages([
        ...savedUnsplashResults,
        ...savedPexelsResults,
        ...savedPixabayResults,
      ]);
      setFilterParams((prev) => ({
        ...prev,
        page: Math.max(
          parseInt(localStorage.getItem("unsplash_current_page")) || 1,
          parseInt(localStorage.getItem("pexels_current_page")) || 1,
          parseInt(localStorage.getItem("pixabay_current_page")) || 1
        ),
      }));
      setQuery(savedQuery);
    }

    const serviceIds = Object.keys(localStorage)
      .filter((key) => key.startsWith("apiKey_"))
      .map((key) => key.replace("apiKey_", ""));

    setServices((prevServices) => [
      ...new Set([...prevServices, ...serviceIds]),
    ]);
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
    setImages([]); // Reset images on new search
    setFilterParams((prev) => ({ ...prev, page: 1 }));

    // Clear localStorage to avoid mixing results
    ["unsplash", "pexels", "pixabay"].forEach((service) => {
      localStorage.removeItem(`${service}_search_results`);
      localStorage.removeItem(`${service}_current_page`);
      localStorage.setItem(`${service}_current_query`, query);
    });

    try {
      const fetchPromises = selectedServices.map(async (service) => {
        toast.success(`Searching ${service} for: ${query}`);
        const apiKey = localStorage.getItem(`apiKey_${service}`);
        if (!apiKey) {
          toast.warning(`API key for ${service} is not set`);
          return [];
        }

        if (service === "unsplash") {
          const results = await searchUnsplash(query, 1, filterParams);
          localStorage.setItem(
            "unsplash_search_results",
            JSON.stringify(results.results)
          );
          localStorage.setItem("unsplash_current_page", "1");
          return results.results;
        }

        if (service === "pexels") {
          const results = await searchPexels(query, 1, filterParams);
          localStorage.setItem(
            "pexels_search_results",
            JSON.stringify(results.results)
          );
          localStorage.setItem("pexels_current_page", "1");
          return results.results;
        }

        if (service === "pixabay") {
          const results = await searchPixabay(query, 1, filterParams);
          localStorage.setItem(
            "pixabay_search_results",
            JSON.stringify(results.results)
          );
          localStorage.setItem("pixabay_current_page", "1");
          return results.results;
        }

        return [];
      });

      const resultsArray = await Promise.all(fetchPromises);
      const newImages = resultsArray.flat(); // Flatten the array of arrays

      setImages(newImages);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    try {
      let nextPage = filterParams.page + 1;

      const fetchPromises = selectedServices.map(async (service) => {
        const apiKey = localStorage.getItem(`apiKey_${service}`);
        if (!apiKey) {
          toast.warning(`API key for ${service} is not set`);
          return [];
        }

        if (service === "unsplash") {
          const results = await searchUnsplash(query, nextPage, filterParams);
          localStorage.setItem(
            "unsplash_search_results",
            JSON.stringify([...images, ...results.results])
          );
          localStorage.setItem("unsplash_current_page", nextPage.toString());
          return results.results;
        }

        if (service === "pexels") {
          const results = await searchPexels(query, nextPage, filterParams);
          localStorage.setItem(
            "pexels_search_results",
            JSON.stringify([...images, ...results.results])
          );
          localStorage.setItem("pexels_current_page", nextPage.toString());
          return results.results;
        }

        if (service === "pixabay") {
          const results = await searchPixabay(query, nextPage, filterParams);
          localStorage.setItem(
            "pixabay_search_results",
            JSON.stringify([...images, ...results.results])
          );
          localStorage.setItem("pixabay_current_page", nextPage.toString());
          return results.results;
        }

        return [];
      });

      const resultsArray = await Promise.all(fetchPromises);
      const newImages = [...images, ...resultsArray.flat()]; // Preserve previous images and append new ones

      setImages(newImages);
      setFilterParams((prev) => ({ ...prev, page: nextPage }));
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <AuthCheck routeIfNotAuthenticated="/get-started" /> */}
      <div className="min-h-screen w-full px-5 py-12 [background:radial-gradient(125%_125%_at_50%_10%,#0a0f18_40%,#17A34A_100%)] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center my-5 min-w-[600px]">
          <h3 className="mb-4 text-2xl font-semibold">Search by keyword</h3>
          <form onSubmit={handleSubmit} className="w-full">
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
        <Result images={images} loading={loading} />

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
    </>
  );
}
