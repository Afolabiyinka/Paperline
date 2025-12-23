import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { User } from "lucide-react";
import useSignUp from "../hooks/useSignUp";
import type React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const { handleSubmit, setSignUpData, signUpData } = useSignUp();
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <div className="h-screen w-screen bg-white">
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <h1 className="flex items-center gap-3 text-2xl font-semibold mb-3">
                <User size={25} />
                Create an account
              </h1>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Input
                  startIcon="User"
                  placeholder="Firstname"
                  value={signUpData.firstname}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      firstname: e,
                    })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Input
                  startIcon="User"
                  placeholder="Lastname"
                  value={signUpData.lastname}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      lastname: e,
                    })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Input
                  startIcon="Mail"
                  placeholder="Email"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      email: e,
                    })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Input
                  startIcon="Lock"
                  placeholder="Password"
                  type="password"
                  value={signUpData.password}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      password: e,
                    })
                  }
                />
              </div>
              <div className="grid gap-3">
                <Input
                  type="password"
                  startIcon="Lock"
                  placeholder="Confirm Password"
                  value={signUpData.confirmedPassword}
                  onChange={(e) =>
                    setSignUpData({
                      ...signUpData,
                      confirmedPassword: e,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <Checkbox id="checkbox" />
              <label htmlFor="checkbox">Remember me</label>
            </div>
            <div className="w-full flex flex-col gap-3 items-center mt-3">
              <Button className="w-full">Create Account</Button>
              <Link to={`/auth/login`}>
                Already an account?{" "}
                <a className="text-gray-900 underline underline-offset-4 cursor-pointer">
                  Sign Up
                </a>
              </Link>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
