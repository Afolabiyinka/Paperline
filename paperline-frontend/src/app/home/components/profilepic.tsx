import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useCloudinary } from "@/utils/cloudinary";
import useUser from "@/app/main/hooks/useUser";

const ProfilePicDialog = () => {
  const { authUser, updatedData, updateProfilePic } = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(
    updatedData.profilePic || authUser?.profilePic || ""
  );
  const { uploadImage, uploading } = useCloudinary();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async (closeDialog: () => void) => {
    if (!selectedFile) return;

    const url = await uploadImage(selectedFile, "paperline/profile_pics");
    if (url) {
      updateProfilePic(url);
      setPreview(url);
      setSelectedFile(null);
      closeDialog();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Change Profile Picture</Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 my-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={preview} />
            <AvatarFallback>
              {authUser?.firstname?.[0]}
              {authUser?.lastname?.[0]}
            </AvatarFallback>
          </Avatar>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer"
          />
          <p className="text-xs text-gray-500">JPG, PNG or GIF (Max 5MB)</p>
        </div>

        <DialogFooter className="flex justify-center gap-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={uploading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={() => handleUpload(() => setPreview(preview))}
            disabled={!selectedFile || uploading}
            className="flex items-center gap-2"
          >
            {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePicDialog;
