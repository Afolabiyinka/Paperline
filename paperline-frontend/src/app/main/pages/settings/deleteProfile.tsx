import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "../../services/user";
import useToastMessage from "@/lib/useToastmsg";
import { useAuthStore } from "@/app/store/authStore";
import { useState } from "react";
import Input from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DeleteProfile = () => {
  const [confirmPhrase, setConfirmed] = useState("");
  const deletePhrase = "delete-my-account";
  const { toastSuccess, toastError } = useToastMessage();
  const { authUser } = useAuthStore();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      toastSuccess("Account deleted successfully");
      // logout();
    },
    onError: (err) =>
      toastError(
        err.message || "Failed to delete account, pls try again later"
      ),
  });

  const handleDelete = () => {
    if (confirmPhrase.trim() !== deletePhrase) {
      toastError("Confirmation phrase does not match");
      return;
    }

    if (!authUser?.id) {
      toastError("User not found");
      return;
    }

    mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
          <AlertDialogContent>
            <p className="mb-1 text-left">
              Type{" "}
              <span className="rounded-sm px-1 py-0.5 border">
                {deletePhrase}
              </span>{" "}
              in the box below
            </p>

            <Input
              startIcon="UserMinus"
              value={confirmPhrase}
              onChange={(e) => setConfirmed(e)}
              placeholder="Type the phrase to confirm"
            />

            <div className="flex gap-3 justify-end">
              <Button variant="secondary">Cancel</Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
                disabled={confirmPhrase.trim() !== deletePhrase || isPending}
              >
                {isPending ? "Deleting..." : "Delete my account"}
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant={`link`}>Cancel</AlertDialogCancel>
          <AlertDialogAction variant={`destructive`}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProfile;
