"use client";

import { useState, useEffect } from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { useSearch } from "@/context/SearchContext";
import StepSlider from "../slider/StepSlider";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

export function FilterDrawer() {
  const { filterParams, setFilterParams } = useSearch();
  const [hasFilter, setHasFilter] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFilterParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleParamSubmit = () => {
    const newParams = {
      ...filterParams,
      page: 1,
    };
    setFilterParams(newParams);
    // URL update is now handled by SearchContext
    toast.success("Filter applied");
  };

  useEffect(() => {
    const savedFilters = localStorage.getItem("filterParams");
    if (savedFilters) {
      setFilterParams(JSON.parse(savedFilters));
    }
  }, []);

  //check if filter has value
  useEffect(() => {
    let count = 0;
    setHasFilter(false);

    Object.keys(filterParams).forEach((key) => {
      if (filterParams[key] !== "" && key !== "page") {
        count++;
        setHasFilter(true);
      }
    });

    setCounter(count);
  }, [filterParams]);


  //reset filter
  const handleResetFilter = () => {
    setFilterParams({
      width: "",
      height: "",
      quality: "75",
      orientation: "portrait",
      page: 1,
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-transparent p-0 text-3xl relative">
          <div className="">
            <Filter />
          </div>
          <div className="absolute top-0 left-3">
            {hasFilter && <Badge variant="destructive" className="flex justify-center w-5 m-auto h-4 p-2 rounded-full">{counter}</Badge>}
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#09090B] border border-gray-700">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Filter by different properties</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="h-[250px]">
              <form>
                <p className="mb-2">Dimension</p>
                <div className="flex gap-3 items-center">
                  <div>
                    <Input
                      name="width"
                      placeholder="Width"
                      value={filterParams?.width || ""}
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div>X</div>
                  <div>
                    <Input
                      name="height"
                      placeholder="Height"
                      value={filterParams?.height || ""}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="my-8">
                  <p className="mb-3">Quality</p>
                  <StepSlider
                    filterParams={filterParams}
                    setFilterParams={setFilterParams}
                  />
                </div>
                <div className="mt-4 mb-2">
                  <p className="mb-3">Orientation</p>
                  <div>
                    <RadioGroup
                      className="flex gap-4 items-center"
                      name="orientation"
                      value={filterParams.orientation}
                      onValueChange={(value) => handleChangeInput({ target: { name: 'orientation', value }})}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="landscape"
                          id="landscape"
                          color="#17A34A"
                        />
                        <Label htmlFor="landscape">Landscape</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="portrait"
                          id="portrait"
                          color="#17A34A"
                        />
                        <Label htmlFor="portrait">Portrait</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="square"
                          id="square"
                          color="#17A34A"
                        />
                        <Label htmlFor="square">Square</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                onClick={handleParamSubmit}
                className="mb-3 bg-[#17A34A] text-white hover:text-black hover:bg-white"
              >
                Set
              </Button>
            </DrawerClose>

              <Button onClick={handleResetFilter}>Reset Filters</Button>

          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
