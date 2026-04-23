import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/custom/Icon";
import ProfilePicUploader from "../../marketing/components/profilepic";
import { Loader2 } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useUpdateUser } from "./hooks/useUpdateProfile";

const UpdateProfile = () => {

  const {
    updatedData,
    setupdatedData,
    handleUpdate,
    loading,
  } = useUpdateUser();

  return (
    <Dialog>

      <DialogTrigger>
        <Icon icon="Pencil" isSolid={false} tooltip="Edit profile" />
      </DialogTrigger>

      <DialogContent className="space-y-6">

        <DialogHeader>
          <DialogTitle className="text-base font-serif font-normal">
            Edit profile
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-5">

          <div className="flex items-center gap-4">

            <Avatar className="h-10 w-10">
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

      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;