import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.08,
         delayChildren: 0.1,
      },
   },
};

export const itemVariants: Variants = {
   hidden: { opacity: 0, y: 12 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
   },
};

export const FadeUpVariant = {
   hidden: {
      opacity: 0,
      y: 100,
   },
   visible: {
      opacity: 1,
      y: 0,
   },
};
