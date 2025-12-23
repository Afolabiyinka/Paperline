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

const DeleteProfile = () => {
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
