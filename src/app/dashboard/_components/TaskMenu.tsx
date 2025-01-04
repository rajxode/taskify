import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";
import UpdateTask from "./UpdateTask";
import { TaskInterface } from "@/types/commonType";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface PropType {
  handleDeleteTask: (id: string) => Promise<void>;
  task: TaskInterface;
  handleUpdateTask: (
    id: string,
    task: { name: string; description?: string }
  ) => Promise<boolean>;
}

const TaskMenu: React.FC<PropType> = ({
  handleDeleteTask,
  task,
  handleUpdateTask,
}) => {
  const { toast } = useToast();
  // const [task, setTask] = useState({
  //   name: previousTask?.name,
  //   description: previousTask?.description,
  // });
  return (
    <Dialog>
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none border-none">
        <div className="w-fit h-fit rounded-full hover:bg-gray-500 px-1 py-1 cursor-pointer">
          <EllipsisVertical />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-50 dark:bg-slate-800 md:min-w-[150px] mr-3">
      <DialogTrigger asChild>
        <DropdownMenuItem>
          {/* <UpdateTask previousTask={task} handleUpdateTask={handleUpdateTask} /> */}
          
            Update
        </DropdownMenuItem>
        </DialogTrigger>
        <DropdownMenuItem onClick={() => handleDeleteTask(task.id)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
              // value={task.name}
              // onChange={(e) => setTask({ ...task, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              // value={task?.description || ""}
              // onChange={(e) =>
              //   setTask({ ...task, description: e.target.value })
              // }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          {/* <Button type="submit" onClick={handleAddTask} disabled={loading}>
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
          </Button> */}
          <DialogClose id="close-btn"></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskMenu;
