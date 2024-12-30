import { IconApiApp } from "@tabler/icons-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router";
import "./navtop.css";
import ThemeToggler from "./themeSwitch";

import { AnimatePresence, motion } from "framer-motion";
import NavItems from "./mainNav";

const links = [
  { name: "Home", to: "/", id: 1 },
  { name: "Blogs", to: "blogcollection", id: 2 },
  { name: "About", to: "about", id: 3 },
  { name: "Request", to: "request", id: 4 },
];

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

export default function NavTop() {
  // const markerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [opened, setOpend] = useState(false);
  // function indicator(e: any) {
  //   if (markerRef.current == null) return;
  //   markerRef.current.style.left = e.offsetLeft + "px";
  //   markerRef.current.style.width = e.offsetWidth + "px";
  // }
  function changeOpen() {
    if (buttonRef.current == null) return;
    if (opened === false) {
      buttonRef.current?.classList.add("opened");
      setOpend(true);
    }
    if (opened === true) {
      buttonRef.current?.classList.remove("opened");
      setOpend(false);
    }
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between p-2 backdrop-blur-sm light light:bg-gradient-to-r light:from-white/20 light:via-white/40 light:to-white/20 dark:bg-gradient-to-r dark:from-black/20 dark:via-black/40 dark:to-black/20 md:justify-evenly">
      <div className="md:hidden">
        <button
          className="menu"
          aria-label="Side Menu"
          ref={buttonRef}
          onClick={changeOpen}
        >
          <svg width="50" height="50" viewBox="0 0 100 100">
            <path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="line line2" d="M 20,50 H 80" />
            <path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-center">
        <h1>
          <IconApiApp
            stroke={2}
            className="light light:text-black dark:text-green-100"
          ></IconApiApp>
        </h1>
        <p className="font-bold light light:text-black dark:text-green-100">
          RB
        </p>
      </div>
      <NavItems></NavItems>
      {/* mobile nav */}
      <div>
        <ThemeToggler></ThemeToggler>
      </div>
      {/* sidenav mobile */}
      <div className="absolute left-0 top-16 flex md:hidden">
        <AnimatePresence>
          {opened && (
            <motion.aside
              initial={{ width: 0 }}
              animate={{
                width: 500,
              }}
              exit={{
                width: 0,
                transition: { delay: 0.5, duration: 0.3 },
              }}
            >
              <motion.div
                className="container"
                initial="closed"
                animate="open"
                exit="closed"
                variants={sideVariants}
              >
                {links.map(({ name, to, id }) => (
                  <motion.div
                    key={id}
                    whileHover={{ scale: 1.1 }}
                    variants={itemVariants}
                    className="sideMenuLink"
                  >
                    <NavLink
                      to={to}
                      onClick={changeOpen}
                      className={"active:text-white"}
                    >
                      {name}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
