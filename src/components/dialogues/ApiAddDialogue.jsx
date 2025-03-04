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

export function ApiAddDialogue({ open, onOpenChange }) {
  const [currentServices, setCurrentServices] = useState([]);

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

  const handleUpdateApiKey = () => {
    currentServices.forEach((service) => {
      const apiKeyInput = document.getElementById(service);
      if (apiKeyInput) {
        const apiKey = apiKeyInput.value;
        localStorage.setItem("apiKey_" + service, apiKey);
      }
    });
    // Dispatch custom event
    window.dispatchEvent(new Event('localStorageChange'));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update API Key</DialogTitle>
          <DialogDescription>
            You can update your existing API key from here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            {currentServices.length > 0 ? (
              currentServices.map((service) => {
                const apiKey = localStorage.getItem("apiKey_" + service) || "";
                return (
                  <div key={service} className="flex gap-4 items-center justify-between">
                    <Label htmlFor={service} className="text-right capitalize w-[20%]">
                      {service}
                    </Label>
                    <Input
                      id={service}
                      defaultValue={apiKey}
                      className="col-span-3 w-[80%]"
                    />
                  </div>
                );
              })
            ) : (
              <div>
                <p className="text-center">No services found.</p>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          {currentServices.length > 0 && (
            <Button
              type="submit"
              className="bg-[#17A34A]"
              onClick={handleUpdateApiKey}
            >
              Save changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
