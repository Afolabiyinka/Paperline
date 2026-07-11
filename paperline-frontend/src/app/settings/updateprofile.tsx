import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfilePicUploader from "../../marketing/components/profilepic";
import { Loader2, Save } from "lucide-react";
import { useUpdateUser } from "./hooks/useUpdateProfile";
import { Label } from "@/components/ui/label";

const UpdateProfile = () => {
  const { updatedData, setupdatedData, handleUpdate, loading } =
    useUpdateUser();

  return (
    <form onSubmit={handleUpdate} className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar size="lg">
          <AvatarImage
            src={updatedData?.profilePic || updatedData.profilePic}
          />
          <AvatarFallback>
            {updatedData?.username?.substring(0, 2)}
          </AvatarFallback>
        </Avatar>

        <ProfilePicUploader />
      </div>

      <div className="space-y-1.5 ">
        <Label
          htmlFor="email"
          className="text-sm font-medium text-muted-foreground"
        >
          Email address
        </Label>
        <Input
          startIcon="Mail"
          placeholder="Email"
          type="email"
          id="email"
          value={updatedData.email}
          onChange={(e) => setupdatedData({ ...updatedData, email: e })}
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="firstname"
          className="text-sm font-medium text-muted-foreground"
        >
          First name
        </Label>
        <Input
          id="firstname"
          startIcon="User"
          placeholder="First name"
          type="text"
          value={updatedData.firstname}
          onChange={(e) => setupdatedData({ ...updatedData, firstname: e })}
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="lastname"
          className="text-sm font-medium text-muted-foreground"
        >
          Last name
        </Label>
        <Input
          id="lastname"
          startIcon="User"
          placeholder="Last name"
          type="text"
          value={updatedData.lastname}
          onChange={(e) => setupdatedData({ ...updatedData, lastname: e })}
        />
      </div>

      <Button className="w-full" type="submit">
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <>
            <Save /> Save changes
          </>
        )}
      </Button>
    </form>
  );
};

export default UpdateProfile;
