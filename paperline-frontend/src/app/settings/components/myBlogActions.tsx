import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const MyBlogActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <MoreHorizontal className="h-4 w-4 text-neutral-500" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-36 rounded-lg border border-neutral-200 bg-white p-1 shadow-lg"
            >
                <DropdownMenuItem className="text-[13px] flex items-center gap-2 text-neutral-700 hover:bg-neutral-100">
                    <Pencil className="h-4 w-4" />
                    Edit
                </DropdownMenuItem>

                <DropdownMenuItem className="text-[13px] flex items-center gap-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default MyBlogActions;