import React from "react";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

const Scrollbtn = () => {
  React.useEffect(() => {}, []);

  function handleScrollUp() {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }
  return (
    <Button
      onClick={handleScrollUp}
      className=" backdrop-blur-3xl text-xl rounded-full"
    >
      <ArrowUp />
    </Button>
  );
};

export default Scrollbtn;
