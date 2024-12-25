import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { NavLink } from "react-router";
import "./menubtn.css";
// import "../navtop.css"

const routes = [
  { label: "dashboard", to: "/admin/dashboard" },
  { label: "home ", to: "/admin/homeOptions" },
  { label: "about ", to: "/admin/aboutOptions" },
  { label: "request ", to: "/admin/requestOptions" },
  { label: "create blog", to: "/admin/createBlog" },
  { label: "settings", to: "/admin/settings" },
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
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

export default function Sidenav() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [opened, setOpend] = useState(false);
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
    <div>
      <div
        className="relative flex flex-col items-center justify-center"
        style={{ fontFamily: "K2D" }}
      >
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
      <div className="absolute left-0 top-16 flex">
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
                {routes.map(({ label, to }) => (
                  <motion.div
                    key={label}
                    whileHover={{
                      scale: 1.1,
                    }}
                    variants={itemVariants}
                    className="sideMenuLink"
                  >
                    <NavLink
                      to={to}
                      onClick={changeOpen}
                      className={
                        "capitalize transition-all duration-300 ease-in-out hover:translate-x-[50px] hover:text-purple-100"
                      }
                    >
                      {label}
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
