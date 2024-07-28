"use client";

import React, { PropsWithChildren } from "react";
import { RecoilRoot } from "recoil";

export const RecoilRootProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
