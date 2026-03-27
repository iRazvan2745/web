import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";
import { authClient } from "@/lib/auth-client";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [showSignIn, setShowSignIn] = useState(true);
  const navigate = useNavigate();

  const user = authClient.useSession().data?.user;

  useEffect(() => {
    if (user) {
      navigate({ to: "/dashboard" });
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center">
      <div className="lg:border-r h-full lg:w-4xl w-full">
        <div className="items-center justify-center h-full flex lg:w-120 mx-auto">
          {showSignIn ? (
            <SignInForm onSwitchToSignUp={() => setShowSignIn(false)} />
          ) : (
            <SignUpForm onSwitchToSignIn={() => setShowSignIn(true)} />
          )}
        </div>
      </div>
      <div className="hidden lg:block">
        <img src="/134.png" className="relative h-230 w-auto" />
      </div>
    </div>
  );
}
