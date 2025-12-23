import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./pages/nav/NavBar";
import { Toaster } from "sonner";
import Lenis from "@studio-freight/lenis";
import {} from "lenis";
import Footer from "./pages/nav/Footer";

const HomeLayout = () => {
  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="font-[Open sans] flex flex-col justify-center items-center">
      <NavBar />
      <Outlet />
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default HomeLayout;
