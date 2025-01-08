import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "lucide-react";

interface PropType {
  type?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickHandler: () => void;
  content: string;
}

const AlertDialog: React.FC<PropType> = ({
  type,
  isOpen,
  setIsOpen,
  clickHandler,
  content,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleConfirmClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await clickHandler();
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 backdrop-blur-sm bg-[#0000000d] bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white dark:bg-[#171717] border rounded-lg text-left overflow-hidden 
                shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="p-4 border-b">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  className="text-xl leading-6 text-[#36621F] font-semibold dark:text-[#3ecf8e]"
                  id="modal-headline"
                >
                  Taskify Alert
                </h3>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 sm:px-6 border-b">
            <p className="text-sm text-gray-500 dark:text-gray-200">
              {content}
            </p>
          </div>
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {type && type === "alert" ? (
              <Button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent 
                        shadow-sm px-4 py-2 bg-green-700 dark:bg-[#195a31] text-base font-medium text-white hover:bg-green-800 
                        focus:outline-none sm:ml-3 sm:w-auto sm:text-sm my-2 sm:my-0"
                onClick={clickHandler}
                ref={closeButtonRef}
              >
                Ok
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent 
                      shadow-sm px-4 py-2 bg-red-700 dark:bg-[#541c15] text-base font-medium text-white hover:bg-red-800 
                      focus:outline-none  sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
                  ref={closeButtonRef}
                  disabled={loading}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent 
                      shadow-sm px-4 py-2 bg-green-700 dark:bg-[#195a31] text-base font-medium text-white hover:bg-green-800 
                      focus:outline-none sm:ml-3 sm:w-auto sm:text-sm my-2 sm:my-0"
                  onClick={handleConfirmClick}
                  ref={closeButtonRef}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      Please wait{" "}
                      <span>
                        <Loader />
                      </span>
                    </>
                  ) : (
                    "Confirm"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
