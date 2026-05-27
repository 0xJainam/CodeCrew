export default function BottomPanel() {
  return (
    <div className="h-40 border-t border-border-default bg-surface-50/40 backdrop-blur-md flex flex-col">
      <div className="flex items-center gap-6 px-4 py-2 border-b border-border-default text-xs uppercase tracking-wider text-zinc-500">
        <button className="text-white">Output</button>
        <button>Terminal</button>
        <button>Problems</button>
      </div>

      <div className="flex-1 p-4 text-sm text-zinc-400 font-mono">
        Code execution output will appear here...
      </div>
    </div>
  );
}