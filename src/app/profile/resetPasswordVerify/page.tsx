"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { paths } from "@/app/types";
import axios from "axios";
import { Navigate } from "@/shared";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const router = useRouter();
  const [isErrorPage, setIsErrorPage] = useState(false);

  const getTokenFromURI = () => {
    const resetToken = searchParams.get("token");
    if (!resetToken) {
      return setIsErrorPage(true);
    }
    setToken(resetToken);
  };

  const handleVerifyPasswordReset = async (resetToken: string) => {
    try {
      await axios.post("api/profile/resetPasswordVerify", resetToken);
      router.push("/");
    } catch (error: any) {
      setIsErrorPage(true);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getTokenFromURI();
  }, []);

  useEffect(() => {
    if (token) {
      handleVerifyPasswordReset(token);
    }
  }, [token]);

  if (isErrorPage) return <Navigate path={paths.error} />;

  return (
    <section>
      <h1>Reset successful!</h1>
      <p>You have successfully reset your password.</p>
      <Link href={paths.login}>Go to homepage.</Link>
    </section>
  );
}
