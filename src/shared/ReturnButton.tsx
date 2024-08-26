"use client";

import { useRouter } from "next/navigation";

export function ReturnButton() {
  const router = useRouter();

  return <button onClick={() => router.back()}>← Back</button>;
}
