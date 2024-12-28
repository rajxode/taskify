
import axios from "axios";

export function handleAxiosError(error:unknown, toast: any): void {
    console.log('client error: ', error);
    if(axios.isAxiosError(error)) {
        const errMessage = error?.response?.data?.message || "Something went wrong";
        toast({
            variant:"destructive",
            title:errMessage
        });
    } else {
        toast({
            variant:"destructive",
            title:"An unknown error occured"
        })
    }
}
