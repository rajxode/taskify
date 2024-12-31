
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddTask:React.FC = () => {
    const [newTask, setNewTask] = useState({
        name:"",
        description:"",
    });
    const handleAddTask = (e: React.FormEvent) => {
        // e.preventDefault();
        // if (newTask.trim()) {
        //   setTaskList([...tasks, { id: Date.now(), name: newTask, lastTimerDuration: 0 }]);
        //   setNewTask("");
        // }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Add Task
                </Button>
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
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddTask;
