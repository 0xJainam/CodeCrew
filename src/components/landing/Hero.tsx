"use client";

import { useRouter } from "next/navigation";

function EditorMockup() {
  const codeLines = [
    {
      number: 1,
      content: (
        <>
          <span className="text-blue-400">function</span>{" "}
          <span className="text-white">createRoom</span>()
        </>
      ),
    },
    {
      number: 2,
      content: (
        <span className="pl-4 text-zinc-400">
          const roomId = generateId()
        </span>
      ),
    },
    {
      number: 3,
      content: (
        <>
          <span className="pl-4 text-purple-400">return</span>{" "}
          <span className="text-green-400">roomId</span>
        </>
      ),
    },
    {
      number: 4,
      content: <span></span>,
    },
    {
      number: 5,
      content: (
        <>
          <span className="text-white">console</span>.
          <span className="text-yellow-400">log</span>(
          <span className="text-white">createRoom</span>())
        </>
      ),
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] shadow-2xl">
      {/* top bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
          <div className="h-3 w-3 rounded-full bg-zinc-700" />
        </div>

        <div className="flex gap-6 text-sm text-zinc-500">
          <span className="border-b border-white/20 pb-1 text-zinc-200">
            main.ts
          </span>
          <span>styles.css</span>
          <span>README.md</span>
        </div>
      </div>

      {/* code area */}
      <div className="px-5 py-5 font-mono text-sm">
        {codeLines.map((line) => (
          <div
            key={line.number}
            className="flex items-center gap-4 py-1"
          >
            <span className="w-6 select-none text-right text-zinc-600">
              {line.number}
            </span>

            <div className="flex-1">{line.content}</div>
          </div>
        ))}

        {/* fake cursor */}
        <div className="mt-2 flex items-center gap-2 pl-10">
          <div className="h-5 w-[2px] animate-pulse bg-blue-400" />
          <span className="text-xs text-zinc-600">typing...</span>
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-xs text-zinc-500">
        <span>TypeScript</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-8 lg:px-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_35%_20%,rgba(59,130,246,0.10),transparent_35%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          {/* left */}
          <div className="lg:col-span-5">
            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Code together.
              <br />
              <span className="text-zinc-400">In real time.</span>
            </h1>

            <div className="mt-10 flex gap-4">
              <button
                onClick={() => router.push("/editor")}
                className="cursor-pointer rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
              >
                Create Room
              </button>

              <button
                onClick={() => router.push("/editor")}
                className="cursor-pointer rounded-xl border border-white/10 px-6 py-3 font-medium text-white transition hover:bg-white/5"
              >
                Join Room
              </button>
            </div>
          </div>

          {/* right */}
          <div className="lg:col-span-7">
            <EditorMockup />
          </div>
        </div>
      </div>
    </section>
  );
}