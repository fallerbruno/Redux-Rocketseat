import { create } from "zustand";
import { api } from "../lib/axios";

interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export interface PlayerState {
  currentModuleIndex: number;
  currentLessonIndex: number;
  course: Course | null | undefined;
  isLoading: boolean;

  play: (moduleAndLessonIndex: [number, number]) => void;
  next: () => void;
  load: () => Promise<void>;
}

export const useStore = create<PlayerState>((set, get) => {
  return {
    course: null,
    currentLessonIndex: 0,
    currentModuleIndex: 0,
    isLoading: false,

    load: async () => {
      set({ isLoading: true });
      const response = await api.get("/courses/1");
      set({
        course: response.data,
        isLoading: false,
      });
    },

    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex;
      set({
        currentLessonIndex: lessonIndex,
        currentModuleIndex: moduleIndex,
      });
    },

    next: () => {
      const { currentLessonIndex, currentModuleIndex, course } = get();
      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesseon = course
        ? course?.modules[currentModuleIndex].lessons[nextLessonIndex]
        : null;

      if (nextLesseon) {
        set({ currentLessonIndex: nextLessonIndex });
        return;
      }

      const nextModuleIndex = currentModuleIndex + 1;
      const nextModule = course ? course.modules[nextModuleIndex] : null;

      if (nextModule) {
        set({ currentModuleIndex: nextModuleIndex, currentLessonIndex: 0 });
      }
    },
  };
});

export const useCurrentLesson = () => {
  return useStore((state) => {
    const { currentModuleIndex, currentLessonIndex } = state;

    const currentModule = state.course
      ? state.course.modules[currentModuleIndex]
      : null;

    const currentLesson = currentModule
      ? currentModule.lessons[currentLessonIndex]
      : null;

    return { currentModule, currentLesson };
  });
};
