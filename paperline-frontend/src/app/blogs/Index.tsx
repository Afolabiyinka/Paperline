import { Outlet } from "react-router-dom";

const BlogLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <Outlet />
    </div>
  );
};

export default BlogLayout;
