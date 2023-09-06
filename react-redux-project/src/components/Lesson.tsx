import { PlayCircle, Video } from "lucide-react";

interface LessonProps {
  title: string;
  duration: string;
  isCurrent?: boolean;
  onPlay: () => void;
}

export function Lesson({
  title,
  duration,
  onPlay,
  isCurrent = false,
}: LessonProps) {
  return (
    <button
      className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-500 enabled:hover:text-zinc-100"
      onClick={onPlay}
      data-active={isCurrent}
      disabled={isCurrent}
    >
      {isCurrent ? (
        <PlayCircle className="w-6 h-6 text-emerald-500" />
      ) : (
        <Video className="w-4 h-4 text-zinc-500" />
      )}
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  );
}
