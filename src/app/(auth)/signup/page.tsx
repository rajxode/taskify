
import React from "react";
import SignupForm from "@/app/(auth)/signup/_component/SignupForm";
import AuthCardWrapper from "@/components/auth-components/AuthCardWrapper";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Sign Up"
}

export default function SignUpPage() {
  return (
    <AuthCardWrapper heading="Create an Account">
      <SignupForm />
    </AuthCardWrapper>
  );
}
