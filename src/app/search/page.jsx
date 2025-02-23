"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useSearch } from "@/context/SearchContext";
import { FilterDrawer } from "@/components/filter-drawer/FilterDrawer";

export default function SearchInput() {
  const { query, setQuery, selectedServices, setSelectedServices, services, setServices, filterParams, setFilterParams, handleServiceToggle } = useSearch();


  useEffect(() => {
    const serviceIds = Object.keys(localStorage)
      .filter((key) => key.startsWith("apiKey_"))
      .map((key) => key.replace("apiKey_", ""));

    setServices((prevServices) => {
      const uniqueServices = [...new Set([...prevServices, ...serviceIds])];
      return uniqueServices;
    });
  }, [setServices]);
  // console.log(services);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.warning("Please enter a search query");
      return;
    }
    if (selectedServices.length === 0) {
      toast.warning("Please select at least one service");
      return;
    }

    selectedServices.forEach((serviceId, index) => {
      // Show "Searching" message
      setTimeout(() => {
        toast.success(`Searching ${serviceId} for: ${query}`);
        // Show "Got results" message 1 second after the "Searching" message
        setTimeout(() => {
          toast.success(`Got results from ${serviceId}`);
        }, 1000);
      }, index * 2000); // Each service's messages will start 2 seconds after the previous service
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
        <div className="relative">
          <Input
            type="text"
            placeholder="Beach, Dogs, Sunset, Cats etc..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-8 text-xl rounded-full border-2 border-gray-300 focus:border-[#17A34A] focus:ring-2 focus:ring-[#17A34A] focus:outline-none"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={24}
          />
        </div>
        <div className="mt-5 flex gap-5 items-center justify-center">
          {/* Checkboxes of services */}
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
            className="mt-5 w-full bg-white text-black hover:text-white py-6 rounded-full hover:bg-green-600"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}
