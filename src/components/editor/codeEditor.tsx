"use client";

import Editor from "@monaco-editor/react";
import type { Dispatch, SetStateAction } from "react";
import type { FilesMap } from "@/app/editor/page";

type CodeEditorProps = {
  files: FilesMap;
  selectedFile: string;
  setFiles: Dispatch<SetStateAction<FilesMap>>;
};

export default function CodeEditor({
  files,
  selectedFile,
  setFiles,
}: CodeEditorProps) {
  const currentFile = files[selectedFile];

  if (!currentFile) {
    return <div className="flex-1 min-h-0 bg-surface-0" />;
  }

  return (
    <div className="flex-1 min-h-0 bg-surface-0">
      <Editor
        height="100%"
        language={currentFile.language}
        theme="vs-dark"
        value={currentFile.content}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          smoothScrolling: true,
          automaticLayout: true,
          padding: {
            top: 16,
          },
        }}
        onChange={(value) =>
          setFiles((prev) => {
            if (!prev[selectedFile]) return prev;
            return {
              ...prev,
              [selectedFile]: {
                ...prev[selectedFile],
                content: value || "",
              },
            };
          })
        }
      />
    </div>
  );
}