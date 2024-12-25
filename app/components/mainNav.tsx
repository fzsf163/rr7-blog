import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  IconHomeFilled,
  IconLayoutGridFilled,
  IconDialpadFilled,
  IconArticleFilled,
} from "@tabler/icons-react";
const navItems = [
  {
    path: "/",
    name: "Home",
    icon: <IconHomeFilled></IconHomeFilled>,
  },
  {
    path: "blogs",
    name: "Blogs",
    icon: <IconArticleFilled></IconArticleFilled>,
  },
  {
    path: "about",
    name: "About",
    icon: <IconLayoutGridFilled></IconLayoutGridFilled>,
  },
  {
    path: "request",
    name: "Request",
    icon: <IconDialpadFilled></IconDialpadFilled>,
  },
];

export default function NavItems() {
  let location = useLocation();
  let patharray = location.pathname.split("/");

  let pathname = "/";

  if (location.pathname) {
    if (patharray[1] === "") {
      pathname = "/";
    } else {
      pathname = patharray[1];
    }
  }

  // const [hoveredPath, setHoveredPath] = useState(pathname);
  // const [activeNow, setActiveNow] = useState(pathname);
  // useEffect(() => {
  //   if (location.pathname) {
  //     if (patharray[1] === "") {
  //       setActiveNow("/");
  //       // setHoveredPath(patharray[1]);
  //     } else {
  //       setActiveNow(patharray[1]);
  //       // setHoveredPath("/");
  //     }
  //   }
  // }, [patharray]);

  return (
    <div className="z-[100] hidden rounded-md bg-slate-700/20 p-[0.4rem] text-black backdrop-blur-md md:block">
      <nav className="relative z-[100] flex w-full justify-start gap-2 rounded-lg">
        {navItems.map((item, index) => {
          const isActive = item.path === pathname;
          return (
            <Link
              key={item.path}
              className={`relative rounded-md px-4 py-2 text-sm no-underline duration-300 ease-in lg:text-base ${
                isActive
                  ? "text-zinc-100"
                  : "light:text-black dark:text-white/70"
              }`}
              data-active={isActive}
              to={item.path}
              // onMouseOver={() => setHoveredPath(item.path)}
              // onMouseLeave={() => setHoveredPath(pathname)}
            >
              <span className="flex items-center justify-center gap-2 mix-blend-exclusion transition-all duration-100 ease-in-out hover:text-white">
                {" "}
                {item.icon} {item.name}
              </span>
              {item.path === pathname && (
                <motion.div
                  className="absolute bottom-0 left-0 -z-10 h-full rounded-md bg-stone-800/90 dark:bg-zinc-200"
                  layoutId="navbar"
                  aria-hidden="true"
                  style={{
                    width: "100%",
                  }}
                  transition={{
                    type: "tween",
                    bounce: 0.1,
                    stiffness: 130,
                    damping: 9,
                    duration: 0.3,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
