import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

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
  isLoading: boolean,

}

export const fetchCourse = createAsyncThunk("player/load", async () => {
  const response = await api.get("/courses/1");
  return response.data;
});

const initialState: PlayerState = {
  course: null,
  currentLessonIndex: 0,
  currentModuleIndex: 0,
  isLoading: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    // start: (state, action: PayloadAction<Course>) => {
    //   state.course = action.payload;
    // },

    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentLessonIndex = action.payload[0];
      state.currentModuleIndex = action.payload[1];
    },

    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesseon = state.course
        ? state.course?.modules[state.currentModuleIndex].lessons[
            nextLessonIndex
          ]
        : null;

      if (nextLesseon) {
        state.currentLessonIndex = nextLessonIndex;
        return;
      }

      const nextModuleIndex = state.currentModuleIndex + 1;
      const nextModule = state.course
        ? state.course.modules[nextModuleIndex]
        : null;

      if (nextModule) {
        state.currentModuleIndex = nextModuleIndex;
        state.currentLessonIndex = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false
    });
    builder.addCase(fetchCourse.pending, (state) => {
      state.isLoading = true
    });
  },
});

export const { play, next } = playerSlice.actions;
export const player = playerSlice.reducer;

export const useCurrentLesson = () => {
  return useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player;

    const currentModule = state.player.course
      ? state.player.course.modules[currentModuleIndex]
      : null;

    const currentLesson = currentModule
      ? currentModule.lessons[currentLessonIndex]
      : null;

    return { currentModule, currentLesson };
  });
};
