import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useAnimationFrame } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import NavBar from "./pages/nav/NavBar";
import Footer from "./pages/nav/Footer";
import { Toaster } from "sonner";

const HomeLayout = () => {
  const lenisRef = useRef<Lenis | null>(null);

  // create Lenis ONCE
  useEffect(() => {
    lenisRef.current = new Lenis({
      smoothWheel: true,
      // smoothTouch: false,
    });

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Framer Motion drives Lenis
  useAnimationFrame((time) => {
    lenisRef.current?.raf(time);
  });

  return (
    <div className="font-[Open Sans] flex flex-col min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
};

export default HomeLayout;
