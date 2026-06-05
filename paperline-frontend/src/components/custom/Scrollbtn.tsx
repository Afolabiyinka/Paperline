import React from "react";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

const Scrollbtn = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY >= window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScrollUp() {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }

  if (!visible) return null;

  return (
    <Button
      variant="ghost"
      size={`icon-lg`}
      onClick={handleScrollUp}
      className="fixed bottom-6 right-6 backdrop-blur-3xl rounded-full shadow z-50"
    >
      <ArrowUp className="stroke-[1px]" />
    </Button>
  );
};

export default Scrollbtn;