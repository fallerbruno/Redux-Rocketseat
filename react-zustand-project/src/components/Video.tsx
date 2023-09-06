import ReactPlayer from "react-player";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../store";

export function Video() {
  const { currentLesson } = useCurrentLesson();

  const { isLoading, next } = useStore((store) => {
    return {
      isLoading: store.isLoading,
      next: store.next,
    };
  });

  function handlePlayNext() {
    next();
  }

  if (!currentLesson) {
    return null;
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-start justify-center">
          <Loader className="w-10 h-10 text-zinc-200 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
          onEnded={handlePlayNext}
          playing
        />
      )}
    </div>
  );
}
