import { createSlice } from "@reduxjs/toolkit";

const saved =
  typeof window !== "undefined" ? localStorage.getItem("theme") : null;
const prefersDark =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: saved || (prefersDark ? "dark" : "light") },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export const selectTheme = (s) => s.theme.mode;
export default themeSlice.reducer;
