"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/auth/signin`);
  }, [router]);

  return <div></div>;
}
