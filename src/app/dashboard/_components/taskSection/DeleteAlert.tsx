
import React from "react";
import { useToast } from "@/hooks/use-toast";
import AlertDialog from "@/components/alert-dialog/AlertDialog";

interface PropType {
    isOpen:boolean;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
    handleDeleteTask:(id:string) => Promise<boolean>;
    taskId:string;
}

const DeleteAlert:React.FC<PropType> = ({isOpen, setIsOpen, handleDeleteTask, taskId}) => {
  const {toast} = useToast();
  const handleConfirmClick = async() => {
    try {
        const result = await handleDeleteTask(taskId);
        if(result) {
            toast({
                variant:"success",
                title:"Task deleted"
            })
        } else {
            throw new Error;
        }
    } catch (error:unknown) {
        toast({
            variant:"destructive",
            title:"Something went wrong"
        })
    }
  }
  return (
    <AlertDialog
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={"Are you sure you want to delete this task? All time logs associated with"+
        " this task will be permanently removed and cannot be recovered."}
      clickHandler={handleConfirmClick}
    />
  )
}

export default DeleteAlert;