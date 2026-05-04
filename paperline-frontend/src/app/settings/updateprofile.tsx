import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfilePicUploader from "../../marketing/components/profilepic";
import { Loader2 } from "lucide-react";
import { useUpdateUser } from "./hooks/useUpdateProfile";

const UpdateProfile = () => {

  const {
    updatedData,
    setupdatedData,
    handleUpdate,
    loading,
  } = useUpdateUser();

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

      <Input
        startIcon="Mail"
        placeholder="Email"
        type="email"
        value={updatedData.email}
        onChange={(e) =>
          setupdatedData({ ...updatedData, email: e })
        }
      />

      <Input
        startIcon="User"
        placeholder="First name"
        type="text"
        value={updatedData.firstname}
        onChange={(e) =>
          setupdatedData({ ...updatedData, firstname: e })
        }
      />

      <Input
        startIcon="User"
        placeholder="Last name"
        type="text"
        value={updatedData.lastname}
        onChange={(e) =>
          setupdatedData({ ...updatedData, lastname: e })
        }
      />

      <Button className="w-full" type="submit">

        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          "Save changes"
        )}

      </Button>

    </form>


  );
};

export default UpdateProfile;