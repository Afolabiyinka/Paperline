import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FileText, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useDeleteBlog } from "../blogs/hooks/useDeletePost";

const MyBlogActions = ({ blogId }: { blogId: string }) => {
  const { handleDelete, loading } = useDeleteBlog(blogId);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon-lg"
            className="h-10 w-10 rounded-md transition-opacity"
          >
            <MoreHorizontal className="h-6 w-6 text-neutral-500" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-36 rounded border border-border  p-1 shadow-lg ring-0"
        >
          <DropdownMenuItem className="text-[13px] flex items-center gap-2 text-neutral-700 hover:bg-neutral-100">
            <Pencil className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-[13px] flex items-center gap-2 text-neutral-700 hover:bg-neutral-100">
            <FileText className="h-4 w-4" />
            Turn to draft
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => setConfirmOpen(true)}
            className="text-[13px] flex items-center gap-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="p-5 border-0 ring-0">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The blog post will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex flex-col gap-2 w-full">
              <AlertDialogAction
                variant="destructive"
                disabled={loading}
                onClick={handleDelete}
                size={`default`}
              >
                <Trash2 />
                Delete Post
              </AlertDialogAction>
              <AlertDialogCancel disabled={loading} variant={`ghost`}>
                Cancel
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default MyBlogActions;
