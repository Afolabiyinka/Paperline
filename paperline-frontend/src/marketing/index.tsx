// import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
// import Lenis from "@studio-freight/lenis";
import NavBar from "./pages/nav/NavBar";
import Footer from "./pages/nav/Footer";

const HomeLayout = () => {
  // const lenisRef = useRef<Lenis | null>(null);

  // useEffect(() => {
  //   lenisRef.current = new Lenis({
  //     smoothWheel: true,
  //   });

  //   return () => {
  //     lenisRef.current?.destroy();
  //     lenisRef.current = null;
  //   };
  // }, []);

  // useAnimationFrame((time) => {
  //   lenisRef.current?.raf(time);
  // });

  return (
    <div className="font-[Open Sans] flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
