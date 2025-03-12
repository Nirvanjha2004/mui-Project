"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Particles } from "@/components/magicui/particles";
import SignupPage from "@/Pages/SignupPage";

export function ParticlesDemo() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <span className=" flex justify-center items-center z-10 text-center text-4xl font-semibold leading-none">
        <SignupPage/>
      </span>
      <Particles
        className="absolute inset-0 z-0"
        quantity={600}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
