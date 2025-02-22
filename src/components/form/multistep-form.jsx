"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Timeline from "./timeline";

const services = [
  {
    id: "unsplash",
    name: "Unsplash",
    apiLink: "https://unsplash.com/developers",
  },
  { id: "pexels", name: "Pexels", apiLink: "https://www.pexels.com/api/" },
  {
    id: "giphy",
    name: "Giphy",
    apiLink: "https://developers.giphy.com/docs/api/",
  },
  { id: "pixabay", name: "Pixabay", apiLink: "https://pixabay.com/api/docs/" },
];

export default function MultistepForm() {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [apiKeys, setApiKeys] = useState({});

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleApiKeyChange = (serviceId, value) => {
    setApiKeys((prev) => ({ ...prev, [serviceId]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Submitted API Keys:", apiKeys);
    
    // Check if all selected services have API keys
    const missingKeys = selectedServices.some(
      (serviceId) => !apiKeys[serviceId] || apiKeys[serviceId].trim() === ""
    );

    if (missingKeys) {
        toast.error("Please enter API keys for all selected services");
        return;
    }

    Object.keys(apiKeys).forEach((serviceId) => {
        localStorage.setItem(`apiKey_${serviceId}`, apiKeys[serviceId]);
    });

    toast.success("API Keys saved successfully");
    
    setStep(3);
  };

  return (
    <div className="w-full max-w-2xl">
      <Timeline currentStep={step} />
      <Card>
        <CardHeader>
          <CardTitle>API Key Setup</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Select Services</h3>
              {services.map((service) => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={selectedServices.includes(service.id)}
                    onCheckedChange={() => handleServiceToggle(service.id)}
                  />
                  <label
                    htmlFor={service.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {service.name}
                  </label>
                </div>
              ))}
            </div>
          )}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-medium">Enter API Keys</h3>
              {selectedServices.map((serviceId) => (
                <div key={serviceId} className="space-y-2">
                  <label htmlFor={serviceId} className="text-sm font-medium">
                    {services.find((s) => s.id === serviceId).name} API Key
                  </label>
                  <Input
                    id={serviceId}
                    value={apiKeys[serviceId] || ""}
                    onChange={(e) =>
                      handleApiKeyChange(serviceId, e.target.value)
                    }
                    required
                  />
                  <p className="text-[12px] mt-0">You can get it from <a href={services.find((s) => s.id === serviceId).apiLink} className="text-blue-500">here</a></p>
                </div>
              ))}
            </form>
          )}
          {step === 3 && (
            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">Confirmation</h3>
              <p>Your API keys have been saved successfully!</p>
              <Button className="mt-4">Let's Find Images</Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && step < 3 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          {step < 2 && (
            <Button
              onClick={handleNext}
              disabled={selectedServices.length === 0}
            >
              Next
            </Button>
          )}
          {step === 2 && <Button onClick={handleSubmit}>Submit</Button>}
          {step === 3 && <Button onClick={() => setStep(1)} variant="primary">Start Over</Button>}
        </CardFooter>
      </Card>
    </div>
  );
}
