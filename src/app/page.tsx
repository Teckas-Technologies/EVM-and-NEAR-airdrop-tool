"use client"

import { Hero } from "@/components/Body/Hero";
import { Header } from "@/components/Header/Header";

export default function Home() {
  return (
      <main className="relative flex flex-col w-full items-center overflow-x-hidden min-h-[100vh] overflow-x-hidden">
        <Header />
        <Hero />
      </main>
  );
}
