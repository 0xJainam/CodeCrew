"use client";

import { useState } from "react";
import Topbar from "@/components/editor/EditorTopbar";
import Sidebar from "@/components/editor/sidebar";
import CodeEditor from "@/components/editor/codeEditor";
import UsersPanel from "@/components/editor/usersPanel";
import Tabs from "@/components/editor/Tabs";
import BottomPanel from "@/components/editor/bottomPanel";

export type FileData = {
  language: string;
  content: string;
};

export type FilesMap = Record<string, FileData>;

export default function EditorPage() {
  const [files, setFiles] = useState<FilesMap>({
    "main.ts": {
      language: "typescript",
      content: `function greet(name: string) {
  return \`Hello \${name}\`;
}

console.log(greet("CodeCrew"));
`,
    },

    "styles.css": {
      language: "css",
      content: `body {
  background: #18181b;
  color: white;
}`,
    },

    "README.md": {
      language: "markdown",
      content: `# CodeCrew`,
    },
  });

  const [selectedFile, setSelectedFile] = useState("main.ts");
  const [openTabs, setOpenTabs] = useState(["main.ts", "styles.css", "README.md"]);

  return (
    <div className="h-screen overflow-hidden bg-surface-0 text-white">
      <Topbar
        roomId="room-a7x9"
        files={files}
        setFiles={setFiles}
        selectedFile={selectedFile}
      />

      <div className="flex h-[calc(100%-56px)]">
        <Sidebar
          files={files}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          setFiles={setFiles}
          openTabs={openTabs}
          setOpenTabs={setOpenTabs}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Tabs
            files={files}
            openTabs={openTabs}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            setOpenTabs={setOpenTabs}
          />
          <CodeEditor
            files={files}
            selectedFile={selectedFile}
            setFiles={setFiles}
          />
          <BottomPanel />
        </div>

        <UsersPanel />
      </div>
    </div>
  );
}