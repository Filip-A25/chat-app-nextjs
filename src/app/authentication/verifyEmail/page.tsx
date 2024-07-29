"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navigate } from "@/shared";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [isErrorPage, setIsErrorPage] = useState(false);
  const [token, setToken] = useState("");

  const getTokenFromURI = () => {
    const verifyToken = searchParams.get("token");
    if (!verifyToken) {
      setIsErrorPage(true);
      return;
    }
    setToken(verifyToken);
  };

  const handleEmailVerify = async (verifyToken: string) => {
    try {
      await axios.post("/api/authentication/verifyEmail", {
        token: verifyToken,
      });
    } catch (error: any) {
      setIsErrorPage(true);
      throw new Error(error);
    }
  };

  useEffect(() => {
    getTokenFromURI();
  }, []);

  useEffect(() => {
    if (token) {
      handleEmailVerify(token);
    }
  }, [token]);

  if (isErrorPage) return <Navigate path="/error" />;

  return (
    <section>
      <h1>Verification successful!</h1>
      <p>You have successfully verified your e-mail address.</p>
      <Link href="/authentication/login">Go to login.</Link>
    </section>
  );
}
