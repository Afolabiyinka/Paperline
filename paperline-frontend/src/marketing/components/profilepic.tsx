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
import { useCloudinary } from "@/shared/utils/cloudinary";
import { useUpdateUser } from "@/app/settings/hooks/useUpdateProfile";

const ProfilePicDialog = () => {
  const { updatedData, updateProfilePic } = useUpdateUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(
    updatedData.profilePic
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

  const handleUpload = async (close: () => void) => {
    if (!selectedFile) return;

    const url = await uploadImage(
      selectedFile,
      "paperline/profile_pics"
    );

    if (url) {
      updateProfilePic(url);
      setSelectedFile(null);
      close();
    }
  };

  return (
    <Dialog>

      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm">
          Change photo
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-sm space-y-6">

        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-base font-serif font-normal">
            Profile photo
          </DialogTitle>
        </DialogHeader>

        {/* Preview */}
        <div className="flex flex-col items-center gap-4">

          <Avatar className="w-28 h-28">
            <AvatarImage src={preview} />
            <AvatarFallback>
              {updatedData?.username?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>

          {/* Hidden input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id="profile-upload"
          />

          {/* Custom trigger */}
          <label
            htmlFor="profile-upload"
            className="text-sm text-neutral-600 hover:text-black cursor-pointer transition"
          >
            Choose image
          </label>

          <p className="text-xs text-neutral-400">
            JPG, PNG or GIF (max 5MB)
          </p>

        </div>

        {/* Actions */}
        <DialogFooter className="flex justify-between">

          <DialogClose asChild>
            <Button variant="ghost" disabled={uploading}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={() => handleUpload(() => { })}
            disabled={!selectedFile || uploading}
          >
            {uploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Save"
            )}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default ProfilePicDialog;