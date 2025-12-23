import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useLogin from "../hooks/useLogin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "@/components/ui/input";

export default function Login() {
  const { handlelogin, setLoginData, loginData } = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlelogin();
  };

  return (
    <div className="h-screen w-screen">
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <h1 className="flex items-center gap-3 text-2xl font-semibold mb-3">
                <User size={25} />
                Login to your account
              </h1>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-3">
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
              </div>
              <div className="grid gap-3">
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
              </div>
            </div>
            <div className="flex justify-between w-full mt-4">
              <div className="flex items-center gap-1 ">
                <Checkbox id="checkbox" />
                <label htmlFor="checkbox" className="text-sm cursor-pointer">
                  Remember me
                </label>
              </div>
              <div>
                <Link to="forgot-password"></Link>
              </div>
            </div>
            <div className="w-full flex flex-col gap-3 items-center mt-4">
              <Button className="w-full cursor-pointer" type="submit">
                Log in
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
