"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { loggedState } from "@/app/authentication/state";
import { useRecoilValue, useRecoilState } from "recoil";
import { Navigate, PageLoading } from "@/shared";
import { usePathname } from "next/navigation";
import { publicRoutesState, privateRoutesState } from "@/app/state";
import { paths } from "@/app/types";
import axios from "axios";

export const AuthRouteGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedState);
  const pathname = usePathname();
  const publicRoutes = useRecoilValue(publicRoutesState);
  const privateRoutes = useRecoilValue(privateRoutesState);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const getLoggedState = async () => {
      try {
        const response = await axios.get("/api/authentication/token");
        if (!response.data.tokenData) return;
        setIsLoggedIn(true);
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setIsPageLoading(false);
      }
    };

    getLoggedState();

    const handleBeforeUnload = () => {
      getLoggedState();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (isPageLoading) return <PageLoading />;

  if (!publicRoutes.includes(pathname) && !privateRoutes.includes(pathname)) {
    return <Navigate path={paths.error} />;
  }

  if (!isLoggedIn && !publicRoutes.includes(pathname)) {
    return <Navigate path={paths.home} />;
  }

  if (isLoggedIn && !privateRoutes.includes(pathname)) {
    return <Navigate path={paths.myChats} />;
  }

  return <>{children}</>;
};
