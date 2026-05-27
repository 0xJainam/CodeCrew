"use client";

import Logo from "@/components/shared/logo";
import { useState } from "react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import type { FilesMap } from "@/app/editor/page";
import { Check, Clipboard } from "lucide-react";

type TopbarProps = {
  roomId: string;
  files: FilesMap;
  selectedFile: string;
  setFiles: Dispatch<SetStateAction<FilesMap>>;
};

export default function Topbar({
  roomId,
  files,
  selectedFile,
  setFiles,
}: TopbarProps) {
  const [copied, setCopied] = useState(false);

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  function changeLanguage(language: string) {
    setFiles((prev) => ({
      ...prev,
      [selectedFile]: {
        ...prev[selectedFile],
        language,
      },
    }));
  }

  return (
    <div className="flex items-center justify-between h-14 px-5 border-b border-border-default bg-surface-50/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Logo size="sm" href="/" />

        <div className="h-5 w-px bg-border-default" />

        <div className="flex items-center gap-1.5">
          <div className="rounded-md border border-border-default bg-surface-100 px-2.5 py-1 text-xs font-mono text-zinc-400">
            {roomId}
          </div>

          <button
            onClick={copyRoomId}
            className="rounded-md border border-border-default bg-surface-100 w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Clipboard size={14} />}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <select
          value={files[selectedFile].language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="rounded-md border border-border-default bg-surface-100 px-3 py-1.5 text-xs text-zinc-300"
        >
          <option value="typescript">TypeScript</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="css">CSS</option>
          <option value="markdown">Markdown</option>
        </select>

        <button className="rounded-md bg-accent-500/15 border border-accent-500/25 px-3.5 py-1.5 text-xs text-accent-400">
          Run
        </button>

        <Link
          href="/"
          className="rounded-md bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 text-xs text-red-400"
        >
          Leave
        </Link>
      </div>
    </div>
  );
}