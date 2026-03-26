import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {

  const [showSignIn, setShowSignIn] = useState(true);

  return (
    <div className="flex items-center">
      <div className="md:border-r h-full items-center justify-center flex md:w-120 mx-auto">
        {showSignIn ? <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} /> : <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />}
      </div>
      <div className="hidden md:block">
        <img src="/134.png" className="relative h-230 w-auto" />
      </div>
    </div>
  )
}
