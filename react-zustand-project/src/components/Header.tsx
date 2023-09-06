import { useCurrentLesson, useStore } from "../store";

export function Header() {
  const { currentLesson, currentModule } = useCurrentLesson();

  const isLoading = useStore((store) => store.isLoading);

  if (!currentLesson || !currentModule) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold ">Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold ">{currentLesson.title}</h1>

      <span
        className="text-sm text-zinc-400
        "
      >
        Modulo: {currentModule.title}
      </span>
    </div>
  );
}
//
