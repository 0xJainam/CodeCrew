"use client";

import Link from "next/link";
import Logo from "@/components/shared/logo";


export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-default bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Logo href="/" />
        <Link
          href="/editor"
          className="rounded-xl border border-white/10 bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Launch Editor
        </Link>
      </div>
    </header>
  );
}