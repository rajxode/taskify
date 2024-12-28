
import React from "react";
import SignupForm from "./_component/SignupForm";
import AuthCardWrapper from "@/components/auth-components/AuthCardWrapper";

export default function SignUpPage() {
  return (
    <AuthCardWrapper heading="Create an Account">
        <SignupForm />
    </AuthCardWrapper>
  );
}
