"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearch } from "@/context/SearchContext";
import { ApiKeyTab } from "./ApiKeyTab";

export function ApiAddDialogue({ open, onOpenChange }) {
  const [currentServices, setCurrentServices] = useState([]);
  const {allServices} = useSearch();
  const [getAllServices, setGetAllServices] = useState(allServices);


  const loadServices = () => {
    try {
      const services = JSON.parse(localStorage.getItem("services")) || [];
      setCurrentServices(services);
    } catch (error) {
      console.error("Error loading services:", error);
      setCurrentServices([]);
    }
  };

  useEffect(() => {
    loadServices();
    // Listen for custom localStorage change event
    window.addEventListener('localStorageChange', loadServices);

    return () => {
      window.removeEventListener('localStorageChange', loadServices);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[425px] p-4 sm:p-6 rounded-lg">
        <DialogHeader className="space-y-2 sm:space-y-3">
          <DialogTitle className="text-lg sm:text-xl font-semibold text-center">
            Add/Update API key
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 sm:mt-4">
          <ApiKeyTab onOpenChange={onOpenChange} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
