
import React, { useState } from "react";
import { Loader, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { axiosInstance } from "@/utils/axiosInstance";
import { TaskInterface } from "@/types/commonType";

interface PropType {
    setTaskList:React.Dispatch<React.SetStateAction<TaskInterface[]>>;
    taskList: TaskInterface[];
}

const AddTask:React.FC<PropType> = ({setTaskList, taskList}) => {
    const {toast} = useToast();
    const [newTask, setNewTask] = useState({
        name:"",
        description:"",
    });
    const [loading, setLoading] = useState(false);
    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if(newTask.name.trim()) {
                const {data} = await axiosInstance.post("/task/add-task",{name:newTask.name.trim(), description:newTask.description});
                if(data.success) {
                    toast({
                        variant:"success",
                        title:"Task added successfully"
                    })
                    const task = data?.task;
                    setTaskList([...taskList, task]);
                    if(window != undefined) {
                        const closeBtn = document.getElementById("close-btn");
                        closeBtn?.click();
                    }
                    setNewTask({
                        name:"",
                        description:""
                    });
                }
            } else {
                toast({
                    variant:"destructive",
                    title:"Task name required"
                })
            }   
        } catch (error:unknown) {
            handleAxiosError(error,toast);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-white bg-[#36621f] dark:bg-[#006239] px-5 dark:hover:bg-[#27882c] 
                    py-2 rounded-full tracking-wide text-sm flex items-center"
                >
                    <span className="text-xs"><Plus size={20} /></span>&nbsp;Add Task
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-left">
                            Name
                        </Label>
                        <Input 
                            id="name" 
                            value={newTask.name}
                            onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                            className="col-span-3" 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-left">
                            Description
                        </Label>
                        <Input 
                            id="description" 
                            value={newTask.description}
                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            className="col-span-3" 
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                        type="submit"
                        onClick={handleAddTask}
                        disabled={loading}
                    >
                        {
                            loading
                            ?
                            <>
                                Please wait <span><Loader /></span>
                            </>
                            :
                            "Add Task"
                        }
                    </Button>
                    <DialogClose id="close-btn"></DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddTask;
