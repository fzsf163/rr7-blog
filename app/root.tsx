import { HeroUIProvider } from "@heroui/react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useRouteError,
} from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "./tailwind.css";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import ToTop from "./utils/scrolltotop";

import { ToastContainer } from "react-toastify";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <HeroUIProvider navigate={navigate}>
          <NextThemesProvider attribute="class" defaultTheme="light">
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
        <ScrollRestoration
          getKey={(location) => {
            // default behavior
            return location.key;
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

// TODO:
// ^ add translation option bn-en
export default function App() {
  return (
    <div className="bn-google">
      <Outlet />
      <ToTop></ToTop>
      <ToastContainer
        theme="dark"
        bodyClassName={"font-bold"}
        style={{ fontFamily: "K2D,sans-serif" }}
      />
    </div>
  );
}

// the mighty error boundary
export function ErrorBoundary({ e }: { e: Error }) {
  const error = useRouteError();
  const refError = ReferenceError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="text-2xl font-bold">
        <p>RootMan Found Error</p>
        {error.data} <br /> {error.status} <br /> {error.statusText}
      </div>
    );
  }
  if (refError) {
    return (
      <div className="text-center text-2xl font-bold capitalize text-foreground-400">
        error ohno!!!
        <p className="text-xl font-bold">{refError.name}</p>
        {/* {refError.stack} */}
        {refError.message}
        {/* {refError.cause as string} */}
      </div>
    );
  }
  if (e) {
    return <div>{e.name}</div>;
  }

  return <div>Better Call Saul</div>;
}
