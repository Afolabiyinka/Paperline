import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Loader2, User } from "lucide-react";
import useSignUp from "../hooks/useSignUp";
import type React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const { handleSubmit, setSignUpData, signUpData, loading } = useSignUp();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-sm space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <User size={22} className="mx-auto text-neutral-600" />
          <h1 className="text-xl font-serif font-normal text-black">
            Create account
          </h1>
          <p className="text-sm text-neutral-500">
            Start writing your stories
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">

          <Input
            startIcon="User"
            placeholder="First name"
            value={signUpData.firstname}
            onChange={(e) =>
              setSignUpData({ ...signUpData, firstname: e })
            }
          />

          <Input
            startIcon="User"
            placeholder="Last name"
            value={signUpData.lastname}
            onChange={(e) =>
              setSignUpData({ ...signUpData, lastname: e })
            }
          />

          <Input
            startIcon="Mail"
            placeholder="Email"
            value={signUpData.email}
            onChange={(e) =>
              setSignUpData({ ...signUpData, email: e })
            }
          />

          <Input
            startIcon="Lock"
            placeholder="Password"
            type="password"
            value={signUpData.password}
            onChange={(e) =>
              setSignUpData({ ...signUpData, password: e })
            }
          />

          <Input
            startIcon="Lock"
            placeholder="Confirm password"
            type="password"
            value={signUpData.confirmedPassword}
            onChange={(e) =>
              setSignUpData({
                ...signUpData,
                confirmedPassword: e,
              })
            }
          />

          {/* Button */}
          <Button
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Create account"
            )}
          </Button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-500">
          Already have an account?
          <Link
            to="/auth/login"
            className="ml-2 text-black hover:underline"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}