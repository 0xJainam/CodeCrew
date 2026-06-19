import Link from "next/link";

export default function HomePage() {
  const editorCode = `const room = await createRoom();

socket.join(room.id);

editor.onChange((code) => {
  socket.emit("update", code);
});

console.log("Connected");`;

  return (
    <main className="h-screen overflow-hidden bg-surface-0 text-white px-8 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="text-4xl font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            CodeCrew
          </Link>

          <div className="flex gap-8 text-m text-zinc-300">
            <Link
              href="/login"
              className="relative transition-colors hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="relative transition-colors hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border-default bg-surface-50 shadow-card">
          <div className="flex items-center gap-2 border-b border-border-default px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <div className="grid h-380px md:grid-cols-[240px_1fr]">
            <div className="border-r border-border-default p-5">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-500">
                Files
              </p>

              <div className="space-y-2 text-sm text-zinc-400">
                <p>src</p>
                <p className="pl-4">room.ts</p>
                <p className="pl-4">auth.ts</p>
                <p className="pl-4">socket.ts</p>
                <p className="pl-4">editor.ts</p>
              </div>
            </div>

            <div className="overflow-auto p-8">
              <pre className="font-mono text-sm leading-8 text-zinc-300">
                <code>{editorCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}