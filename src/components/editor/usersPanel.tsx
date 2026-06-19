const avatarColors = [
  "bg-accent-500/20 text-accent-400",
  "bg-purple-500/20 text-purple-400",
  "bg-emerald-500/20 text-emerald-400",
  "bg-amber-500/20 text-amber-400",
  "bg-rose-500/20 text-rose-400",
];

function getAvatarStyle(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
}

interface UserInfo {
  userId: string;
  username: string;
  isOwner: boolean;
}

interface UsersPanelProps {
  users: UserInfo[];
  currentUserId: string;
}

export default function UsersPanel({ users, currentUserId }: UsersPanelProps) {
  return (
    <div className="w-56 border-l border-border-default bg-surface-50/60 backdrop-blur-xl flex flex-col">
      <div className="px-4 pt-4 pb-3 flex items-center justify-between">
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Active Users
        </h2>
        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 tabular-nums">
          {users.length}
        </span>
      </div>

      <div className="flex-1 px-2 pb-4 space-y-0.5">
        {users.map((user) => (
          <div
            key={user.userId}
            className="group flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-zinc-400 transition-all duration-200 hover:bg-surface-200/80 hover:text-zinc-200"
          >
            <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${getAvatarStyle(user.username)}`}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[13px] font-medium truncate">{user.username}</span>
              {user.userId === currentUserId && (
                <span className="text-[10px] text-zinc-600">(you)</span>
              )}
              {user.isOwner && (
                <span className="text-[10px] text-amber-400">[Owner]</span>
              )}
            </div>
            <div className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
          </div>
        ))}
      </div>
    </div>
  );
}