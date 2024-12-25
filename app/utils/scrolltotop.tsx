import { useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { IconCaretUpFilled } from "@tabler/icons-react";
export default function ToTop() {
  const [showBtn, setShowBtn] = useState(false);

  if (typeof window !== "undefined") {
    // browser code
    window.onscroll = function () {
      scrollFunction();
    };
  }

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowBtn(true);
    } else {
      setShowBtn(false);
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <Tooltip className="bg-black text-white" content="Go To Top">
      <Button
        onClick={topFunction}
        id="myBtn"
        className={
          showBtn
            ? `fixed z-50 bottom-5 right-5 h-[4rem] w-[3rem] rounded-full bg-slate-800/40 text-white hover:bg-blue-200 hover:text-black`
            : `hidden`
        }
        title="Go to top"
        size="sm"
      >
        <IconCaretUpFilled width={50} height={50} />
      </Button>
    </Tooltip>
  );
}
