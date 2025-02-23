"use client"
import { Filter, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function FilterDrawer() {



  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="primary">
          <Filter />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-[#09090B] border border-gray-700">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Filter by different properties</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="mt-3 h-[120px]">
              <h1>Drawer Content</h1>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
