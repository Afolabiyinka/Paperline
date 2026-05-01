import Logo from "@/components/custom/Logo";
import Scrollbtn from "@/components/custom/Scrollbtn";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  { name: "Facebook", link: "https://facebook.com" },
  { name: "Instagram", link: "https://instagram.com" },
  { name: "Github", link: "https://github.com" },
  { name: "Twitter", link: "https://twitter.com" },
] as const;

const FOOTER_LINKS = [
  { name: "About", link: "#" },
  { name: "Help", link: "#" },
  { name: "Privacy", link: "#" },
  { name: "Terms", link: "#" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Left: Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            <Logo />
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              A calm space to read, write, and share your ideas with the world.
            </p>
          </motion.div>

          {/* Center: Footer Links */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-medium text-black dark:text-white">
              Resources
            </h3>
            <nav className="flex flex-col gap-3">
              {FOOTER_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Right: Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-sm font-medium text-black dark:text-white">
              Follow
            </h3>
            <nav className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-800 mb-8" />

        {/* Bottom: Copyright & Scroll Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide">
            © {currentYear} Paperline. All rights reserved.
          </p>
          <Scrollbtn />
        </div>
      </div>
    </footer>
  );
}