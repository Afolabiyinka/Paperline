import { motion } from "motion/react";

interface MenuButtonProps {
  open: boolean;
  onClick?: () => void;
}

const MenuButton = ({ open, onClick }: MenuButtonProps) => {
  return (
    <div
      className="relative w-8 h-10 flex items-center justify-center cursor-pointer"
      onClick={onClick}
    >
      <motion.span
        title="Button"
        initial={false}
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute border-2 border-primary w-8 rounded"
      />

      <motion.span
        initial={false}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute border-2 border-primary w-8 rounded"
      />

      <motion.span
        initial={false}
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 8 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="absolute border-2 border-primary w-8 rounded"
      />
    </div>
  );
};

export default MenuButton;
