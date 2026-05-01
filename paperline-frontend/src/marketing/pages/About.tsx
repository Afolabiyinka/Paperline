import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import aboutImg from "@/assets/undraw_add-post_prex.svg"


const About = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen px-6 lg:px-16"
    >
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-5xl w-full">

        {/* Illustration */}
        <motion.div
          className="shrink flex justify-center w-full lg:w-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img src={aboutImg} />
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex flex-col  w-full"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Kicker */}
          <p
            className="text-xs font-medium tracking-widest uppercase mb-5"
            style={{ color: "#6b6b6b", fontFamily: "system-ui, sans-serif" }}
          >
            About Paperline
          </p>

          {/* Headline */}
          <h1
            className="font-light leading-snug mb-5"
            style={{
              fontSize: "clamp(30px, 4vw, 44px)",
              letterSpacing: "-0.02em",
              color: "#1a1a1a",
            }}
          >
            A space for writing<br />
            and reading <em>ideas</em>
          </h1>

          {/* Divider */}
          <div className="mb-5" style={{ width: 40, height: 2, background: "#1a1a1a" }} />

          {/* Body */}
          <p
            className="font-light leading-relaxed mb-9"
            style={{ fontSize: 17, color: "#3d3d3d", lineHeight: 1.72 }}
          >
            Paperline is a minimal blog platform for people who prefer clarity over noise. No distractions, no clutter — just the words that matter.
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-3">
            <p
              className="text-sm"
              style={{ color: "#6b6b6b", fontFamily: "system-ui, sans-serif" }}
            >
              Stay in the loop. New stories, weekly.
            </p>

            <div
              className="flex items-stretch overflow-hidden"
              style={{
                border: "1px solid #d0cdc8",
                borderRadius: 4,
                background: "#fff",
              }}
            >
              <Input
                startIcon="Mail"
                type="email"
                placeholder="your@email.com"

              />
              <Button
                variant="default"
                className="rounded-none border-l px-5 text-xs font-medium tracking-wide"
                style={{
                  borderColor: "#d0cdc8",
                  background: "#1a1a1a",
                  color: "#faf9f7",
                  fontFamily: "system-ui, sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                Join
              </Button>
            </div>

            <p
              className="text-xs"
              style={{ color: "#9a9a9a", fontFamily: "system-ui, sans-serif" }}
            >
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;