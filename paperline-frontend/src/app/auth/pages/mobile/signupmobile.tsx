import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Input from "@/components/ui/input";
import { User } from "lucide-react";

const Signupmobile = () => {
  return (
    <div>
      <Drawer>
        <DrawerTrigger>
          <div className="w-full border">
            <Button variant={`outline`} className="w-full">
              Sign up
            </Button>
          </div>
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>
              <h1 className="flex items-center gap-3 text-2xl font-semibold mb-3">
                <User size={25} />
                Create an account
              </h1>
            </DrawerTitle>
          </DrawerHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input placeholder="Email" startIcon="Mail" value="" />
            </div>
            <div className="grid gap-3">
              <Input startIcon="Lock" placeholder="password" value="" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Checkbox id="checkbox" />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <DrawerFooter>
            <div className="w-full flex flex-col gap-3 items-center">
              <Button className="w-full">Log in</Button>
              <p>
                Don't an account?{" "}
                <a className="text-gray-900 underline underline-offset-4 cursor-pointer">
                  Sign Up
                </a>
              </p>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Signupmobile;
