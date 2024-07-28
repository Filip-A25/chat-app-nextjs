"use client";

import React, { PropsWithChildren } from "react";
import { loggedState } from "@/app/authentication/state";
import { useRecoilValue } from "recoil";
import { Navigate } from "@/shared";
import { usePathname } from "next/navigation";
import { publicRoutesState, privateRoutesState } from "@/app/state";

export const RoutePublicGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useRecoilValue(loggedState);
  const pathname = usePathname();
  const publicRoutes = useRecoilValue(publicRoutesState);
  const privateRoutes = useRecoilValue(privateRoutesState);

  if (!isLoggedIn && !publicRoutes.includes(pathname))
    return <Navigate path="/authentication/login" />;

  if (isLoggedIn && !privateRoutes.includes(pathname))
    return <Navigate path="/my-chats" />;

  return <>{children}</>;
};
