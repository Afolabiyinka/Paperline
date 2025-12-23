"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Input from "@/components/ui/input";
import { User } from "lucide-react";
import useLogin from "../../hooks/useLogin";
import { Toaster } from "sonner";

const LoginMobile = () => {
  const { handlelogin, setLoginData, loginData, isLoading } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlelogin();
  };

  return (
    <div className="w-full">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full">Log in</Button>
        </DrawerTrigger>

        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>
              <h1 className="flex items-center gap-3 text-2xl font-semibold">
                <User size={25} />
                Login to your account
              </h1>
            </DrawerTitle>
          </DrawerHeader>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid gap-4 px-4">
              <Input
                startIcon="Mail"
                placeholder="Email"
                type="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e,
                  })
                }
              />
              <Input
                startIcon="Lock"
                placeholder="Password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e,
                  })
                }
              />

              <div className="flex items-center gap-2">
                <Checkbox id="remember" disabled={isLoading} />
                <label
                  htmlFor="remember"
                  className="text-sm cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              Log in
            </Button>
            <p className="text-sm text-center">
              Don't have an account?{" "}
              <a className="text-gray-900 underline underline-offset-4 cursor-pointer font-medium">
                Sign Up
              </a>
            </p>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default LoginMobile;
