"use client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormFooter from "@/components/auth-components/CustomFormFooter";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(5,"Password must contain atleast characters"),
});

const SigninForm = () => {
  const {toast} = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema)
  });
  
  async function onSubmit(values: z.infer < typeof formSchema > ) {
    setIsLoading(true);
    try {
      const {data} = await axiosInstance.post("/users/login",values);
      const {success,message} = data;
      if(success) {
        toast({
          variant:"success",
          title:"User logged in !!"
        });
        form.reset({
          email:"",
          password:""
        })
        router.push("/dashboard");
      } else {
        toast({
          variant:"destructive",
          title:message
        })
      }
    } catch (error:unknown) {
      handleAxiosError(error,toast);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto"
      >
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your@email.com"
                  type="email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Your password"
                  type="password"
                  {...field} 
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <CustomFormFooter
          isLoading={isLoading}
          btnText="Sign In"
          linkSrc="/signup"
          linkText="Create an account"
        /> 
      </form>
    </Form>
  )
}

export default SigninForm;