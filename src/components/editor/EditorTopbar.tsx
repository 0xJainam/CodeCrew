"use client";

import Logo from "@/components/shared/logo";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { FilesMap } from "@/app/editor/page";
import { Check, Clipboard } from "lucide-react";

type TopbarProps = {
  roomId: string;
  files: FilesMap;
  selectedFile: string;
  setFiles: Dispatch<SetStateAction<FilesMap>>;
  setSelectedFile: Dispatch<SetStateAction<string>>;
  setOpenTabs: Dispatch<SetStateAction<string[]>>;
  onLeave: () => void;
};

export default function Topbar({
  roomId,
  files,
  selectedFile,
  setFiles,
  setSelectedFile,
  setOpenTabs,
  onLeave,
}: TopbarProps) {
  const [copied, setCopied] = useState(false);

  const copyRoomId = async () => {
    await navigator.clipboard.writeText(roomId);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const extensionMap: Record<string, string> = {
    typescript: ".ts",
    javascript: ".js",
    python: ".py",
    cpp: ".cpp",
    java: ".java",
    css: ".css",
    json: ".json",
    markdown: ".md",
    html: ".html",
  };

  function changeLanguage(language: string) {
    if (!files[selectedFile]) return;

    const newExt = extensionMap[language];
    const dotIndex = selectedFile.lastIndexOf(".");
    const baseName = dotIndex > 0 ? selectedFile.slice(0, dotIndex) : selectedFile;
    const newFileName = newExt ? baseName + newExt : selectedFile;

    if (newFileName === selectedFile) {
      setFiles((prev) => ({
        ...prev,
        [selectedFile]: { ...prev[selectedFile], language },
      }));
      return;
    }

    if (files[newFileName]) {
      alert(`A file named ${newFileName} already exists`);
      return;
    }

    setFiles((prev) => {
      const updated = { ...prev };
      updated[newFileName] = { ...updated[selectedFile], language };
      delete updated[selectedFile];
      return updated;
    });

    setOpenTabs((prev) =>
      prev.map((tab) => (tab === selectedFile ? newFileName : tab))
    );
    setSelectedFile(newFileName);
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
          value={files[selectedFile]?.language || "typescript"}
          onChange={(e) => changeLanguage(e.target.value)}
          className="rounded-md border border-border-default bg-surface-100 px-3 py-1.5 text-xs text-white"
        >
          <option className="text-black" value="typescript">TypeScript</option>
          <option className="text-black" value="javascript">JavaScript</option>
          <option className="text-black" value="python">Python</option>
          <option className="text-black" value="cpp">C++</option>
          <option className="text-black" value="java">Java</option>
          <option className="text-black" value="css">CSS</option>
          <option className="text-black" value="markdown">Markdown</option>
        </select>

        <button
          onClick={onLeave}
          className="rounded-md bg-red-500/10 border border-red-500/20 px-3.5 py-1.5 text-xs text-red-400 cursor-pointer"
        >
          Leave
        </button>
      </div>
    </div>
  );
}