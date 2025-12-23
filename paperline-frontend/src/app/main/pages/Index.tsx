import Scrollbtn from "@/components/Scrollbtn";
import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <Outlet />
      <Scrollbtn />
    </div>
  );
};

export default BlogLayout;
