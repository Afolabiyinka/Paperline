import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components/ui/tabs";
import { AlertTriangle, Settings, User } from "lucide-react";
import UpdateProfile from "./updateprofile";

const SettingsTabs = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={`secondary`} size={`icon-lg`}>
          <Settings />
        </Button>
      </DialogTrigger>

      <DialogContent className="min-h-[500px] border-0">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Tabs>
          <TabsList variant={`line`}>
            <TabsTrigger value="update-profile">
              <User />
              Update Profile
            </TabsTrigger>
            <TabsTrigger value="security-settings">
              <AlertTriangle />
              Danger Zone
            </TabsTrigger>
          </TabsList>
          <TabsContent value="update-profile" className="p-2">
            <UpdateProfile />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsTabs;
