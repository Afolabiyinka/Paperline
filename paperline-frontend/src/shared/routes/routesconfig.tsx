import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
const Routesconfig = () => {
  const routesModule = createBrowserRouter(routes);
  return <RouterProvider router={routesModule} />;
};

export default Routesconfig;
