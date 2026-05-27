"use client";

import {
  Plus,
  Trash2,
  Pencil,
  FileText,
  FileCode,
  FileJson,
  File,
} from "lucide-react";

import type { Dispatch, SetStateAction } from "react";
import type { FilesMap } from "@/app/editor/page";

type SidebarProps = {
  files: FilesMap;
  selectedFile: string;
  openTabs: string[];
  setSelectedFile: Dispatch<SetStateAction<string>>;
  setFiles: Dispatch<SetStateAction<FilesMap>>;
  setOpenTabs: Dispatch<SetStateAction<string[]>>;
};

function detectLanguage(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "ts":
    case "tsx":
      return "typescript";

    case "js":
    case "jsx":
      return "javascript";

    case "py":
      return "python";

    case "cpp":
    case "cc":
    case "cxx":
      return "cpp";

    case "java":
      return "java";

    case "css":
      return "css";

    case "json":
      return "json";

    case "md":
      return "markdown";

    case "html":
      return "html";

    default:
      return "plaintext";
  }
}

function getFileIcon(filename: string) {
  const ext = filename.split(".").pop();

  switch (ext) {
    case "ts":
    case "tsx":
    case "js":
    case "jsx":
      return <FileCode size={14} className="text-accent-400 shrink-0" />;

    case "css":
      return <FileText size={14} className="text-purple-400 shrink-0" />;

    case "json":
      return <FileJson size={14} className="text-yellow-400 shrink-0" />;

    case "md":
      return <FileText size={14} className="text-zinc-400 shrink-0" />;

    default:
      return <File size={14} className="text-zinc-500 shrink-0" />;
  }
}

export default function Sidebar({
  files,
  selectedFile,
  openTabs,
  setSelectedFile,
  setFiles,
  setOpenTabs,
}: SidebarProps) {
  function openFile(fileName: string) {
    if (!openTabs.includes(fileName)) {
      setOpenTabs((prev) => [...prev, fileName]);
    }

    setSelectedFile(fileName);
  }

  function createNewFile() {
    const fileName = prompt("Enter file name (example: app.py)");

    if (!fileName) return;

    if (files[fileName]) {
      alert("File already exists");
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [fileName]: {
        language: detectLanguage(fileName),
        content: "",
      },
    }));

    setOpenTabs((prev) => [...prev, fileName]);
    setSelectedFile(fileName);
  }

  function renameFile(oldName: string) {
    const newName = prompt("Rename file", oldName);

    if (!newName || newName === oldName) return;

    if (files[newName]) {
      alert("File already exists");
      return;
    }

    const oldFile = files[oldName];

    setFiles((prev) => {
      const updated = { ...prev };

      delete updated[oldName];

      updated[newName] = {
        ...oldFile,
        language: detectLanguage(newName),
      };

      return updated;
    });

    setOpenTabs((prev) =>
      prev.map((tab) => (tab === oldName ? newName : tab))
    );

    if (selectedFile === oldName) {
      setSelectedFile(newName);
    }
  }

  function deleteFile(fileName: string) {
    const confirmDelete = confirm(`Delete ${fileName}?`);

    if (!confirmDelete) return;

    const fileKeys = Object.keys(files);

    if (fileKeys.length === 1) {
      alert("At least one file must exist");
      return;
    }

    setFiles((prev) => {
      const updated = { ...prev };
      delete updated[fileName];
      return updated;
    });

    setOpenTabs((prev) => prev.filter((tab) => tab !== fileName));

    if (selectedFile === fileName) {
      const nextFile = fileKeys.find((file) => file !== fileName);

      if (nextFile) {
        setSelectedFile(nextFile);

        if (!openTabs.includes(nextFile)) {
          setOpenTabs((prev) => [...prev, nextFile]);
        }
      }
    }
  }

  return (
    <div className="w-56 border-r border-border-default bg-surface-50/60 backdrop-blur-xl flex flex-col">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Explorer
        </h2>

        <button
          onClick={createNewFile}
          className="p-1 rounded-md hover:bg-surface-200 transition cursor-pointer"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="flex-1 px-2 pb-4 space-y-0.5">
        {Object.keys(files).map((file) => (
          <div
            key={file}
            className={`group rounded-md px-2.5 py-2 flex items-center justify-between transition-all duration-200 ${
              selectedFile === file
                ? "bg-surface-200"
                : "hover:bg-surface-200/80"
            }`}
          >
            <div
              onClick={() => openFile(file)}
              className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0"
            >
              {getFileIcon(file)}

              <span className="truncate text-[13px] text-zinc-300">
                {file}
              </span>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => renameFile(file)}
                className="p-1 rounded hover:bg-surface-300 cursor-pointer"
              >
                <Pencil size={12} />
              </button>

              <button
                onClick={() => deleteFile(file)}
                className="p-1 rounded hover:bg-red-500/20 text-red-400 cursor-pointer"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}