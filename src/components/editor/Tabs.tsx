"use client";

import { X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import type { FilesMap } from "@/app/editor/page";

type TabsProps = {
  files: FilesMap;
  openTabs: string[];
  selectedFile: string;
  setSelectedFile: Dispatch<SetStateAction<string>>;
  setOpenTabs: Dispatch<SetStateAction<string[]>>;
};

export default function Tabs({
  files,
  openTabs,
  selectedFile,
  setSelectedFile,
  setOpenTabs,
}: TabsProps) {
  function closeTab(fileName: string) {
    if (openTabs.length === 1) return;

    const remainingTabs = openTabs.filter((tab) => tab !== fileName);

    setOpenTabs(remainingTabs);

    if (selectedFile === fileName) {
      setSelectedFile(remainingTabs[0]);
    }
  }

  return (
    <div className="flex items-center overflow-x-auto border-b border-border-default bg-surface-50/50 scrollbar-hide shrink-0">
      {openTabs.map((file) => {
        if (!files[file]) return null;

        return (
          <div
            key={file}
            onClick={() => setSelectedFile(file)}
            className={`flex items-center gap-2 px-4 py-2 text-sm border-r border-border-default cursor-pointer transition shrink-0 ${
              selectedFile === file
                ? "bg-surface-200 text-white"
                : "text-zinc-400 hover:bg-surface-100 hover:text-zinc-200"
            }`}
          >
            <span>{file}</span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(file);
              }}
              className="rounded p-0.5 hover:bg-zinc-700 cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}