"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Navigate({ path }: { path: string }): null {
  const router = useRouter();

  useEffect(() => {
    router.push(path);
  }, []);

  return null;
}
