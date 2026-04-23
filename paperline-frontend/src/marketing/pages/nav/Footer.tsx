
import Logo from "@/components/custom/Logo";
import Scrollbtn from "@/components/custom/Scrollbtn";

const SOCIAL_LINKs = [
  { name: "Facebook", link: "https://facebook.com" },
  { name: "Instagram", link: "https://instagram.com" },
  { name: "Github", link: "" },
  { name: "Dribbble", link: "" },
] as const;

export default function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 mt-16">
      <div className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo />
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} Paperline
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex gap-6 text-sm text-neutral-600">
            {SOCIAL_LINKs.map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right */}
          <Scrollbtn />
        </div>
      </div>
    </footer>
  );
}