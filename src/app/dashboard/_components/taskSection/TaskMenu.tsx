
import React, {useState} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import UpdateTask from "./UpdateTask";
import { TaskInterface } from "@/types/commonType";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import DeleteAlert from "./DeleteAlert";

interface PropType {
  handleDeleteTask: (id: string) => Promise<boolean>;
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none border-none">
            <div className="w-fit h-fit rounded-full hover:bg-gray-300 dark:hover:bg-[#494949] px-1 py-1 cursor-pointer">
              <EllipsisVertical />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="md:min-w-[150px] mr-3 border">
          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">
                Update
            </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem className="cursor-pointer" 
              onClick={() => setIsOpen(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <UpdateTask previousTask={task} handleUpdateTask={handleUpdateTask} />
      </Dialog>
      { isOpen 
        && 
        <DeleteAlert 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          taskId={task.id}
          handleDeleteTask={handleDeleteTask} 
        />
      }
    </>
  );
};

export default TaskMenu;
