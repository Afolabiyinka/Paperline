import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useLogin from "../hooks/useLogin";
import { Loader, Loader2, User } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "@/components/ui/input";

export default function Login() {
  const { handlelogin, setLoginData, loginData, isLoading } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlelogin();
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-md p-8">
        <h1 className="flex items-center gap-3 text-2xl font-semibold mb-6">
          <User size={25} />
          Login to your account
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            startIcon="Mail"
            placeholder="Email"
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e })}
          />
          <Input
            startIcon="Lock"
            placeholder="Password"
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e })}
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm cursor-pointer">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm underline text-gray-700 cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Log in"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          Don't have an account?
          <Link
            to={`/auth/signup`}
            className="text-gray-900 underline underline-offset-4 cursor-pointer ml-2"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
