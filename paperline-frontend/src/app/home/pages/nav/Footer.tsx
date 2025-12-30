import { motion } from "framer-motion";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";

// const SOCIAL_ICONS = [
//   "Facebook",
//   "Instagram",
//   "Github",
//   "Dribbble",
//   "X",
// ] as const;

const SOCIAL_LINKs = [
  { name: "Facebook", link: "https://facebook.com" },
  { name: "Instagram", link: "https://instagram.com" },
  { name: "Github", link: "" },
  { name: "Dribbble", link: "" },
] as const;

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t  h-full">
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="flex w-full flex-col items-center gap-4 py-4 md:flex-row md:justify-between md:items-center">
          <Logo />

          <div className="flex gap-4 md:gap-8">
            {SOCIAL_LINKs.map((icon) => (
              <motion.a
                key={icon.name}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 dark:text-gray-300"
              >
                <Icon icon={icon.name} tooltip={icon.name} isSolid={false} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
