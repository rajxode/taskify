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

const formSchema = z.object({
  name: z.string(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(5, "Password must contain atleast 5 characters"),
});

const SignupForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await axiosInstance.post(
        "/users/create-account",
        values
      );
      const { success, message } = data;
      if (success) {
        toast({
          variant: "success",
          title: message,
        });
        form.reset({
          name: "",
          email: "",
          password: "",
        });
        router.push("/signin");
      } else {
        toast({
          variant: "destructive",
          title: message,
        });
      }
    } catch (error: any) {
      const { message } = error.response.data;
      if (message) {
        toast({
          variant: "destructive",
          title: message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong !!",
        });
      }
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" type="email" {...field} />
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
                <Input placeholder="Your password" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <CustomFormFooter
          btnText="Sign Up"
          linkSrc="/signin"
          linkText="Already have an account?"
        />
      </form>
    </Form>
  );
};

export default SignupForm;
