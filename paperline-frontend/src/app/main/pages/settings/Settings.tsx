import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUser from "../../hooks/useUser";
import UpdateProfile from "./updateprofile";
import { AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteProfile from "./deleteProfile";
const Settings = () => {
  const { authUser, logout } = useUser();
  return (
    <div className="h-screen flex flex-col w-screen lg:flex-row">
      <div className=" w-full h-full relative p-2">
        <div className="flex justify-between p-3">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={authUser?.profilePic} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>
              <h1 className="lg:text-3xl text-xl font-semibold tracking-widest">
                {authUser?.username}
              </h1>
              <p className="flex mt-2 lg:text-xl text-xs items-center">
                <AtSign />
                {authUser?.email}
              </p>
            </span>
          </div>
          <UpdateProfile />
        </div>
        <hr />
        <span className="flex items-center justify-between mt-5">
          <Button onClick={logout} size={`lg`} variant={`destructive`}>
            Log out
          </Button>
          <DeleteProfile />
        </span>
      </div>
      <div className="border w-full  h-full"></div>
    </div>
  );
};

export default Settings;
