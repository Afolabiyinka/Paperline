import Icon from "@/components/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import UpdateProfile from "./updateprofile";
import { useState } from "react";
const SettingsDropdown = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon icon="MoreHorizontal" isSolid={false} tooltip="Settings" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenModal(true)}>
            <UpdateProfile open={openModal} />
          </DropdownMenuItem>
          <DropdownMenuItem>Bottom</DropdownMenuItem>
          <DropdownMenuItem>Right</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsDropdown;
