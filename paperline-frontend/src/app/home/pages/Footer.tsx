import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";

const SOCIAL_ICONS = ["Facebook", "Instagram", "Github", "Dribbble", "X"];

export default function Footer() {
  return (
    <footer className="w-full bg-background">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="flex w-full flex-col items-center gap-4 py-4 md:flex-row md:justify-between md:items-center">
          <Logo />
          <div className="flex gap-4 md:gap-8">
            {SOCIAL_ICONS.map((name) => (
              <motion.a
                key={name}
                href="#"
                target="_blank"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 dark:text-gray-300"
              >
                <Icon isSolid={false} icon={name} tooltip={name} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
