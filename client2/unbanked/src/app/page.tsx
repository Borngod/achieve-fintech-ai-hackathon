"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Preloader from "@/components/preLoader";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Set a 3-second timeout before navigating to the login page
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    // Cleanup the timeout if the component unmounts before 3 seconds
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Preloader />
    </>
  );
}