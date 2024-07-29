"use client";

import { deleteCookie, getCookie } from "cookies-next";
import { Router } from "next/router";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Check if the clearLocalStorage cookie is set
    const clearLocalStorage = getCookie("clearLocalStorage");
    if (clearLocalStorage) {
      // Clear localStorage
      window.localStorage.clear();
      // Remove the cookie
      deleteCookie("clearLocalStorage", { path: "/" });
    }

    // Handle route changes
    const handleRouteChange = () => {
      const clearLocalStorage = getCookie("clearLocalStorage");
      if (clearLocalStorage) {
        // Clear localStorage
        window.localStorage.clear();
        // Remove the cookie
        deleteCookie("clearLocalStorage", { path: "/" });
      }
    };

    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return <main>{children}</main>;
}
