/**
 * Features section ,premium asymmetric product storytelling layout.
 *
 * Inspired by Linear, Vercel, Warp, and Replit landing pages.
 * Each feature has a bespoke visual treatment ,no generic card grid.
 *
 * Layout:
 * 1. Hero card (full-width)  ,Real-Time Collaboration
 * 2. Two medium cards (50/50) ,Instant Room Creation + Join Shared Sessions
 * 3. Wide card (full-width)  ,Live Presence Indicators
 * 4. Two small cards (50/50)  ,Conflict-Free Editing + Developer-Friendly
 */

/* ================================================================
   MICRO-VISUALIZATION: Collaborative Editor
   ================================================================
   A tiny fake editor with multiple cursors and avatar indicators
   to visually represent real-time collaboration.
   ================================================================ */

function CollabEditorViz() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Floating avatars */}
      <div className="absolute -top-3 right-4 flex items-center gap-1.5 z-10">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white ring-2 ring-surface-100">
          Y
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-400 text-[10px] font-bold text-white ring-2 ring-surface-100">
          A
        </span>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-400 text-[10px] font-bold text-white ring-2 ring-surface-100">
          M
        </span>
      </div>

      {/* Mini editor chrome */}
      <div className="rounded-lg border border-border-default bg-surface-50 overflow-hidden shadow-card">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 border-b border-border-subtle px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
          <span className="h-2 w-2 rounded-full bg-green-500/70" />
          <span className="ml-3 font-(family-name:--font-geist-mono) text-[10px] text-zinc-500">
            collab.ts
          </span>
        </div>

        {/* Code lines with cursors */}
        <div className="px-3 py-3 font-(family-name:--font-geist-mono) text-[11px] leading-[1.6] space-y-px">
          <div className="flex items-center gap-2">
            <span className="w-4 text-right text-zinc-600 select-none text-[10px]">1</span>
            <div>
              <span className="text-purple-400">const</span>{" "}
              <span className="text-accent-400">editor</span>{" "}
              <span className="text-zinc-500">=</span>{" "}
              <span className="text-yellow-300">useCollabEditor</span>
              <span className="text-zinc-300">()</span>
              <span className="text-zinc-500">;</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 text-right text-zinc-600 select-none text-[10px]">2</span>
            <div className="relative">
              <span className="text-purple-400">const</span>{" "}
              <span className="text-accent-400">cursor</span>{" "}
              <span className="text-zinc-500">=</span>{" "}
              <span className="text-yellow-300">getPosition</span>
              <span className="text-zinc-300">()</span>
              <span className="text-zinc-500">;</span>
              {/* Arjun's cursor */}
              <span className="absolute top-0 -right-1 flex flex-col items-end">
                <span className="h-3.5 w-[1.5px] bg-accent-400 animate-pulse" />
                <span className="mt-px rounded-sm bg-accent-400 px-1 text-[7px] font-medium text-white leading-tight">
                  Arjun
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 text-right text-zinc-600 select-none text-[10px]">3</span>
            <span className="text-zinc-600">{"// "}waiting for input...</span>
          </div>
          <div className="flex items-center gap-2 relative">
            <span className="w-4 text-right text-zinc-600 select-none text-[10px]">4</span>
            <div className="relative">
              <span className="text-purple-400">return</span>{" "}
              <span className="text-zinc-300">{"<"}</span>
              <span className="text-green-400">Editor</span>{" "}
              <span className="text-accent-400">theme</span>
              <span className="text-zinc-500">=</span>
              <span className="text-green-400">&quot;dark&quot;</span>{" "}
              <span className="text-zinc-300">{"/>"}</span>
              <span className="text-zinc-500">;</span>
              {/* Maya's cursor */}
              <span className="absolute top-0 left-18 flex flex-col items-start">
                <span className="h-3.5 w-[1.5px] bg-purple-400 animate-pulse [animation-delay:500ms]" />
                <span className="mt-px rounded-sm bg-purple-400 px-1 text-[7px] font-medium text-white leading-tight">
                  Maya
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 text-right text-zinc-600 select-none text-[10px]">5</span>
            <span className="text-zinc-600">&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MICRO-VISUALIZATION: Room Creation Terminal
   ================================================================ */

function RoomCreateViz() {
  return (
    <div className="rounded-lg border border-border-default bg-surface-50 overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-border-subtle px-3 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
        <span className="ml-2 font-(family-name:--font-geist-mono) text-[9px] text-zinc-600">
          terminal
        </span>
      </div>
      <div className="px-3 py-2.5 font-(family-name:--font-geist-mono) text-[10px] leading-relaxed space-y-1">
        <div className="text-zinc-500">
          <span className="text-emerald-400">$</span> CodeCrew create --lang typescript
        </div>
        <div className="text-zinc-400">
          <span className="text-accent-400">✓</span> Room created:{" "}
          <span className="text-emerald-400">room-a7x9</span>
        </div>
        <div className="text-zinc-400">
          <span className="text-accent-400">✓</span> Share link copied to clipboard
        </div>
        <div className="flex items-center gap-1 text-zinc-600">
          <span className="text-emerald-400">$</span>
          <span className="inline-block h-3 w-1px bg-emerald-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MICRO-VISUALIZATION: Join Room Modal
   ================================================================ */

function JoinRoomViz() {
  return (
    <div className="rounded-lg border border-border-default bg-surface-100 overflow-hidden">
      <div className="px-4 py-3 border-b border-border-subtle">
        <p className="text-[11px] font-medium text-zinc-300">Join a Room</p>
      </div>
      <div className="px-4 py-3 space-y-2.5">
        <div className="rounded-md border border-border-default bg-surface-50 px-3 py-1.5 font-(family-name:--font-geist-mono) text-[10px] text-zinc-400 flex items-center justify-between">
          <span>room-a7x9</span>
          <span className="text-zinc-600">|</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-zinc-500">3 collaborators online</span>
          </div>
          <div className="rounded-md bg-accent-500 px-2.5 py-1 text-[9px] font-semibold text-white">
            Join →
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MICRO-VISUALIZATION: Presence Activity Bar
   ================================================================ */

const PRESENCE_USERS = [
  { initials: "YO", color: "bg-emerald-500", name: "You", status: "editing main.ts", active: true },
  { initials: "AR", color: "bg-accent-400", name: "Arjun", status: "viewing styles.css", active: true },
  { initials: "MA", color: "bg-purple-400", name: "Maya", status: "idle · 2m", active: true },
  { initials: "SK", color: "bg-amber-400", name: "Saki", status: "typing...", active: true },
  { initials: "RJ", color: "bg-rose-400", name: "Rajan", status: "offline", active: false },
] as const;

function PresenceBarViz() {
  return (
    <div className="flex items-center gap-3 overflow-hidden">
      {PRESENCE_USERS.map((user) => (
        <div
          key={user.initials}
          className="flex items-center gap-2 shrink-0 rounded-full border border-border-subtle bg-surface-50 pl-1 pr-3 py-1"
        >
          <div className="relative">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white ${user.color} ${
                !user.active ? "opacity-40" : ""
              }`}
            >
              {user.initials}
            </span>
            {user.active && (
              <span className="absolute -bottom-px -right-px h-2 w-2 rounded-full border border-surface-50 bg-emerald-400" />
            )}
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] font-medium ${user.active ? "text-zinc-200" : "text-zinc-500"}`}>
              {user.name}
            </span>
            <span className="text-[8px] text-zinc-500 leading-tight">{user.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   MICRO-VISUALIZATION: CRDT Merge Animation
   ================================================================ */

function ConflictFreeViz() {
  return (
    <div className="space-y-1.5">
      {/* Two branches merging */}
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded border border-emerald-500/30 bg-emerald-500/5 px-2 py-1">
          <span className="font-(family-name:--font-geist-mono) text-[9px] text-emerald-400">+ line 12: const x = 1;</span>
        </div>
        <svg className="w-4 h-4 text-zinc-600 shrink-0" viewBox="0 0 16 16" fill="none">
          <path d="M4 4L8 8L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 4L8 8L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <div className="flex-1 rounded border border-accent-500/30 bg-accent-500/5 px-2 py-1">
          <span className="font-(family-name:--font-geist-mono) text-[9px] text-accent-400">+ line 14: let y = 2;</span>
        </div>
      </div>
      <div className="rounded border border-purple-500/30 bg-purple-500/5 px-2 py-1 text-center">
        <span className="font-(family-name:--font-geist-mono) text-[9px] text-purple-300">
          ✓ merged ,zero conflicts
        </span>
      </div>
    </div>
  );
}

/* ================================================================
   FEATURES ,main export
   ================================================================ */

export function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-surface-0 px-6 py-24 lg:py-32"
    >
      {/* Background atmospheric glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-accent-500/3 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-100 w-150 rounded-full bg-purple-500/3 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Section heading ── */}
        <div className="mb-20 max-w-2xl">
          <p className="mb-3 font-(family-name:--font-geist-mono) text-xs font-medium uppercase tracking-[0.2em] text-accent-400">
            Features
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Built for how developers{" "}
            <span className="text-gradient">actually work</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 lg:text-lg">
            Every feature designed around the real-time collaborative
            workflow ,not bolted on as an afterthought.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════════
           ROW 1 ,Hero Feature Card (Full Width)
           Real-Time Collaboration
           ════════════════════════════════════════════════════════════ */}
        <div className="group relative mb-5 rounded-2xl border border-border-default bg-surface-100 p-1 transition-all duration-500 hover:border-accent-500/30">
          {/* Inner glow on hover */}
          <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-accent-500/4 via-transparent to-purple-500/3 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative grid gap-8 rounded-xl p-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-12">
            {/* Text side */}
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-accent-500/20 bg-accent-500/6 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse" />
                <span className="font-(family-name:--font-geist-mono) text-[10px] font-medium uppercase tracking-wider text-accent-400">
                  Core Feature
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white lg:text-3xl">
                Real-Time Collaboration
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 lg:text-base">
                See every keystroke as it happens. Multiple cursors, live
                selections, and instant sync, the editor feels alive when
                your whole team is in it.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  <span className="text-xs">Sub-50ms latency</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  <span className="text-xs">Multiplayer cursors</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <span className="h-1 w-1 rounded-full bg-emerald-400" />
                  <span className="text-xs">Live selections</span>
                </div>
              </div>
            </div>

            {/* Visualization side */}
            <div className="flex items-center justify-center">
              <CollabEditorViz />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
           ROW 2 ,Two Medium Cards
           Instant Room Creation + Join Shared Sessions
           ════════════════════════════════════════════════════════════ */}
        <div className="mb-5 grid gap-5 md:grid-cols-2">
          {/* ── Instant Room Creation ── */}
          <div className="group relative rounded-2xl border border-border-default bg-surface-100 p-1 transition-all duration-500 hover:border-emerald-500/25">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/3 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative rounded-xl p-6 lg:p-8">
              <h3 className="mb-2 text-lg font-bold text-white">
                Instant Room Creation
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                Spin up a collaborative workspace in seconds.
                Pick your language, get a shareable link, and you're live.
              </p>
              <RoomCreateViz />
            </div>
          </div>

          {/* ── Join Shared Sessions ── */}
          <div className="group relative rounded-2xl border border-border-default bg-surface-100 p-1 transition-all duration-500 hover:border-purple-500/25">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-500/3 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative rounded-xl p-6 lg:p-8">
              <h3 className="mb-2 text-lg font-bold text-white">
                Join Shared Sessions
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                Paste a room code, hit enter, and drop into a live session.
                No accounts, no friction, just code.
              </p>
              <JoinRoomViz />
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
           ROW 3 ,Wide Presence Card (Full Width)
           Live Presence Indicators
           ════════════════════════════════════════════════════════════ */}
        <div className="group relative mb-5 rounded-2xl border border-border-default bg-surface-100 p-1 transition-all duration-500 hover:border-amber-500/20">
          <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-amber-500/2 via-transparent to-emerald-500/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative rounded-xl p-6 lg:px-10 lg:py-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="shrink-0 lg:max-w-xs">
                <h3 className="mb-1 text-lg font-bold text-white">
                  Live Presence Indicators
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Know who's online, what file they're in, and whether they're
                  actively editing, all at a glance.
                </p>
              </div>
              <div className="overflow-x-auto pb-1 -mb-1">
                <PresenceBarViz />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
           ROW 4 ,Two Smaller Supporting Cards
           Conflict-Free Editing + Developer-Friendly Workspace
           ════════════════════════════════════════════════════════════ */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* ── Conflict-Free Editing ── */}
          <div className="group relative rounded-2xl border border-border-default bg-surface-100 p-1 transition-all duration-500 hover:border-emerald-500/20">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/2 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative rounded-xl p-6">
              <h3 className="mb-2 text-base font-bold text-white">
                Conflict-Free Editing
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                CRDT-powered sync means two people can edit the same line,
                changes merge automatically without conflicts.
              </p>
              <ConflictFreeViz />
            </div>
          </div>

          {/* ── Developer-Friendly Workspace ── */}
          <div className="group relative rounded-2xl border border-border-default bg-surface-100 p-1 transition-all duration-500 hover:border-zinc-500/20">
            <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-zinc-500/2 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative rounded-xl p-6">
              <h3 className="mb-2 text-base font-bold text-white">
                Developer-Friendly Workspace
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-zinc-400">
                Dark theme, monospaced fonts, keyboard shortcuts, and
                syntax highlighting. Feels like your favorite IDE.
              </p>
              {/* Mini feature list */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Syntax highlighting",
                  "Dark mode native",
                  "Keyboard shortcuts",
                  "Monaco editor",
                  "Multi-language",
                  "Line numbers",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 rounded-md border border-border-subtle bg-surface-50 px-2.5 py-1.5"
                  >
                    <span className="text-emerald-400 text-[10px]">✓</span>
                    <span className="font-(family-name:--font-geist-mono) text-[10px] text-zinc-400">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
