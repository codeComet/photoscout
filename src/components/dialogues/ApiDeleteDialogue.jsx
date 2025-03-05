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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ApiDeleteDialogue = ({ open, onOpenChange }) => {

const [currentServices, setCurrentServices] = useState([]);
const router = useRouter();

useEffect(() => {
  try {
    const services = JSON.parse(localStorage.getItem("services")) || [];
    setCurrentServices(services);
  } catch (error) {
    console.error("Error loading services:", error);
    setCurrentServices([]);
  }
}, []);

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleDeleteApiKeys = () => {
    localStorage.clear();
    // Dispatch custom event
    window.dispatchEvent(new Event('localStorageChange'));
    toast.success("All the API keys have been deleted!");
    onOpenChange(false);
    router.push("/");
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {currentServices.length !== 0 ? (
        <DialogContent className="max-w-[95vw] sm:max-w-[425px] p-4 sm:p-6 rounded-lg">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl font-semibold leading-7 text-center">
              Clear all the API keys?
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-center text-gray-300">
              This action cannot be undone and you have to add them again.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 w-full">
              <Button 
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-2"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteApiKeys}
                className="w-full sm:w-auto px-6 py-2"
              >
                Yes, Delete!
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent className="max-w-[95vw] sm:max-w-[425px] p-4 sm:p-6 rounded-lg">
          <DialogHeader className="space-y-2 sm:space-y-3">
            <DialogTitle className="text-lg sm:text-xl font-semibold leading-7 text-center">
              No API keys found!
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-center text-gray-300">
              Add some API keys to delete them.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4 sm:mt-6">
            <div className="flex justify-center items-center w-full">
              <Button 
                onClick={handleCancel}
                className="w-full sm:w-auto px-6 py-2"
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default ApiDeleteDialogue;
