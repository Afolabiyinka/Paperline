import Scrollbtn from "@/components/Scrollbtn";
import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <div className="flex flex-col">
      <Outlet />
      <Scrollbtn />
    </div>
  );
};

export default BlogLayout;
