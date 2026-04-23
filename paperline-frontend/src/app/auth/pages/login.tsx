import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useLogin from "../hooks/useLogin";
import { Loader2, User } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "@/components/ui/input";

export default function Login() {
  const { handlelogin, setLoginData, loginData, isLoading } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlelogin();
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6">

      <div className="w-full max-w-sm space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <User size={22} className="mx-auto text-neutral-600" />
          <h1 className="text-xl font-serif font-normal text-black">
            Welcome back
          </h1>
          <p className="text-sm text-neutral-500">
            Sign in to continue writing
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">

          <Input
            startIcon="Mail"
            placeholder="Email"
            type="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e })
            }
          />

          <Input
            startIcon="Lock"
            placeholder="Password"
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e })
            }
          />

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <Link
              to="/forgot-password"
              className="hover:text-black transition"
            >
              Forgot?
            </Link>
          </div>

          {/* Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-500">
          No account?
          <Link
            to="/auth/signup"
            className="ml-2 text-black hover:underline"
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}