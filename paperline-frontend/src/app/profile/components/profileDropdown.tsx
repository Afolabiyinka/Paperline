import { useAuthStore } from "@/app/auth/store/authStore";
import { useLogout } from "@/app/settings/hooks/useLogout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const { logoutLoading, logoutMutate } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          size="sm"
          onClick={() => navigate(`/me`)}
          className="cursor-pointer w-8 h-8 border-0 shadow-none ring-0"
        >
          <AvatarImage src={authUser?.profilePic} />
          <AvatarFallback className="text-xs">
            {authUser?.username?.substring(0, 2)?.toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none">
        <DropdownMenuItem className="" onClick={() => navigate("/me")}>
          <UserRound />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          className=""
          onClick={() => logoutMutate()}
        >
          {logoutLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <LogOut className="w-2 h-2" />
              Logout
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
