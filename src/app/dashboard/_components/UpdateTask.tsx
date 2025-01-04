import React, { useState } from "react";
import { Loader, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { axiosInstance } from "@/utils/axiosInstance";
import { TaskInterface } from "@/types/commonType";

interface PropType {
  previousTask: TaskInterface;
  handleUpdateTask: (
    id: string,
    task: { name: string; description?: string }
  ) => Promise<boolean>;
}

const UpdateTask: React.FC<PropType> = ({ previousTask, handleUpdateTask }) => {
  const { toast } = useToast();
  const [task, setTask] = useState({
    name: previousTask?.name,
    description: previousTask?.description,
  });
  const [loading, setLoading] = useState(false);
  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (task.name.trim()) {
        const result = await handleUpdateTask(previousTask.id, {name:task.name, description:task?.description || ""});
        if (result) {
          toast({
            variant: "success",
            title: "Task updated successfully",
          });
          if (window != undefined) {
            const closeBtn = document.getElementById("close-btn");
            closeBtn?.click();
          }
        } else {
            throw new Error;
        }
      } else {
        toast({
          variant: "destructive",
          title: "Task name required",
        });
      }
    } catch (error: unknown) {
        toast({
            variant: "destructive",
            title: "Something went wrong",
        });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              value={task.name}
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              value={task?.description || ""}
              onChange={(e) =>
                setTask({ ...task, description: e.target.value })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleClick} disabled={loading}>
            {loading ? (
              <>
                Please wait{" "}
                <span>
                  <Loader />
                </span>
              </>
            ) : (
              "Update"
            )}
          </Button>
          <DialogClose id="close-btn"></DialogClose>
        </DialogFooter>
      </DialogContent>
      </>
  );
};

export default UpdateTask;
