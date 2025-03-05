import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearch } from "@/context/SearchContext";

export function ApiKeyTab({onOpenChange}) {
  const [currentServices, setCurrentServices] = useState([]);
  const { allServices } = useSearch();
  const [remainingServices, setRemainingServices] = useState([]);

  const loadServices = () => {
    try {
      const services = JSON.parse(localStorage.getItem("services")) || [];
      setCurrentServices(services);
      setRemainingServices(allServices.filter(service => !services.includes(service.id)));
    } catch (error) {
      console.error("Error loading services:", error);
      setCurrentServices([]);
      setRemainingServices(allServices);
    }
  };

  useEffect(() => {
    loadServices();
    window.addEventListener('localStorageChange', loadServices);
    return () => {
      window.removeEventListener('localStorageChange', loadServices);
    };
  }, [allServices]);

  const handleUpdateApiKey = () => {
    currentServices.forEach((service) => {
      const apiKeyInput = document.getElementById(`update_${service}`);
      if (apiKeyInput) {
        const apiKey = apiKeyInput.value;
        if(apiKey === '') {
          localStorage.removeItem("apiKey_" + service);
          currentServices.splice(currentServices.indexOf(service), 1);
          localStorage.setItem("services", JSON.stringify(currentServices));
          loadServices();
          return;
        } else {
          localStorage.setItem("apiKey_" + service, apiKey);
        }
      }
    });
    window.dispatchEvent(new Event('localStorageChange'));
    onOpenChange(false);
  };

  const handleAddApiKey = (service) => {
    const apiKeyInput = document.getElementById(`add_${service}`);
    if (apiKeyInput) {
      const apiKey = apiKeyInput.value;
      if (apiKey) {
        localStorage.setItem("apiKey_" + service, apiKey);
        const updatedServices = [...currentServices, service];
        localStorage.setItem("services", JSON.stringify(updatedServices));
        window.dispatchEvent(new Event('localStorageChange'));
      }
    }
  };

  return (
    <Tabs defaultValue="update" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-5">
        <TabsTrigger value="update" className="font-semibold">
          Update
        </TabsTrigger>
        <TabsTrigger value="add" className="font-semibold">
          Add
        </TabsTrigger>
      </TabsList>
      <TabsContent value="update">
        <Card className="bg-zinc-900 border-gray-600 text-white">
          <CardHeader>
            <CardTitle>Update API Keys</CardTitle>
            <CardDescription>
              Update your existing API keys here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentServices.map((service) => (
              <div
                key={service}
                className="flex gap-4 items-center justify-between"
              >
                <Label
                  htmlFor={`update_${service}`}
                  className="text-right capitalize w-[20%]"
                >
                  {service}
                </Label>
                <Input
                  id={`update_${service}`}
                  defaultValue={localStorage.getItem("apiKey_" + service) || ""}
                  className="w-[80%]"
                />
              </div>
            ))}
            {currentServices.length === 0 && (
              <p className="text-center text-muted-foreground">
                No API keys to update.
              </p>
            )}
          </CardContent>
          {currentServices.length > 0 && (
            <CardFooter>
              <Button
                className="bg-[#17A34A] hover:bg-[#17A34A]/80 ml-auto"
                onClick={handleUpdateApiKey}
              >
                Save changes
              </Button>
            </CardFooter>
          )}
        </Card>
      </TabsContent>
      <TabsContent value="add">
        <Card className="bg-zinc-900 border-gray-600 text-white">
          <CardHeader>
            <CardTitle>Add New API Keys</CardTitle>
            <CardDescription>
              Add API keys for additional services.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {remainingServices.map((service) => (
              <div
                key={service.id}
                className="flex gap-4 items-center justify-between"
              >
                <Label
                  htmlFor={`add_${service.id}`}
                  className="text-right capitalize w-[20%]"
                >
                  {service.id}
                </Label>
                <div className="flex gap-2 w-[80%]">
                  <Input id={`add_${service.id}`} className="flex-1" />
                  <Button
                    className="bg-[#17A34A] hover:bg-[#17A34A]/80"
                    onClick={() => handleAddApiKey(service.id)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))}
            {remainingServices.length === 0 && (
              <p className="text-center text-muted-foreground">
                No additional services available.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
