"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userDataState } from "../authentication/state";
import { PageLoading } from "@/shared";

export default function Profile() {
  const router = useRouter();
  const user = useRecoilValue(userDataState);

  const handleRedirectToMyProfile = useCallback(() => {
    if (user?.id) {
      router.push(`/profile/${user.id}`);
    }
  }, [user?.id, router]);

  useEffect(() => {
    if (user) handleRedirectToMyProfile();
  }, [user, handleRedirectToMyProfile]);

  return <PageLoading isFullScreen />;
}
