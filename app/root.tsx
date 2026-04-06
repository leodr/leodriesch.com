import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { SiteFooter } from "./components/site-footer";
import "./app.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon-light.png",
    media: "(prefers-color-scheme: light)",
  },
  {
    rel: "icon",
    href: "/favicon-dark.png",
    media: "(prefers-color-scheme: dark)",
  },
  { rel: "apple-touch-icon", href: "/favicon-light.png" },
  { rel: "stylesheet", href: "/fonts/IosevkaCustom.css" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Oops";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (error instanceof Error) {
    details = error.message;
  }

  return (
    <>
      <main className="container error-state">
        <p className="label">Error</p>
        <p className="hero-title">{title}</p>
        <p className="muted">{details}</p>
        <p>
          <a href="/">Return home &rsaquo;</a>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
