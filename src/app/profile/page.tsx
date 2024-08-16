"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userDataState } from "../authentication/state";
import { PageLoading } from "@/shared";

export default function Profile() {
  const router = useRouter();
  const user = useRecoilValue(userDataState);

  const handleRedirectToMyProfile = () => {
    console.log("ayo");
    console.log(user.id);
    router.push(`/profile/${user.id}`);
  };

  useEffect(() => {
    handleRedirectToMyProfile();
  }, [user]);

  return <PageLoading isFullScreen />;
}
