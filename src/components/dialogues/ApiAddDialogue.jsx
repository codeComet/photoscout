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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add/Update API key</DialogTitle>
        </DialogHeader>
        <ApiKeyTab onOpenChange={onOpenChange}/>
      </DialogContent>
    </Dialog>
  );
}
