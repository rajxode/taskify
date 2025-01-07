
import React from "react";
import SigninForm from "@/app/(auth)/signin/_component/SigninForm";
import AuthCardWrapper from "@/components/auth-components/AuthCardWrapper";

export default function SignIn() {
  return (
    <AuthCardWrapper heading="Sign In">
      <SigninForm />    
    </AuthCardWrapper>
  );
}
