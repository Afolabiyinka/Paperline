import useUser from "@/app/main/hooks/useUser";
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
import Icon from "@/components/Icon";
import ProfilePicUploader from "../../../home/components/profilepic";
import { Loader2 } from "lucide-react";

const UpdateProfile = () => {
  const { updatedData, setupdatedData, handleUpdate, authUser, loading } =
    useUser();
  return (
    <Dialog>
      <DialogTrigger>
        <Icon
          icon="Pencil"
          isSolid={false}
          tooltip="Edit your profile details"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h1 className="p-3">Update your profile details</h1>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleUpdate}>
          <div className="grid gap-4">
            <div className="flex items-center gap-6 mb-3 p-3">
              <Avatar>
                <AvatarImage
                  src={authUser?.profilePic || updatedData.profilePic}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ProfilePicUploader />
            </div>
            <div className="grid gap-1">
              <label htmlFor="">Email</label>
              <Input
                startIcon="Mail"
                placeholder="Email"
                type="email"
                value={updatedData.email}
                onChange={(e) => setupdatedData({ ...updatedData, email: e })}
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="">Firstname</label>
              <Input
                startIcon="User"
                placeholder="Firstname"
                type="text"
                value={updatedData.firstname}
                onChange={(e) =>
                  setupdatedData({ ...updatedData, firstname: e })
                }
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="">Lastname</label>
              <Input
                startIcon="User"
                placeholder="Lastname"
                type="text"
                value={updatedData.lastname}
                onChange={(e) =>
                  setupdatedData({ ...updatedData, lastname: e })
                }
              />
            </div>
          </div>
          <div className="border flex justify-between w-full mt-4"></div>
          <div className="w-full flex flex-col gap-3 items-center mt-4">
            <Button className="w-full cursor-pointer" type="submit">
              {loading ? <Loader2 className="animate-spin" /> : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfile;
