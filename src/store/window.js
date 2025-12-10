import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js";

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    // To open a window
    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];

        // Defensive check : If the window doesn't exist, do nothing
        if(!win) return;

        // Open the window and set its zIndex
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex += 1;
      }),

    // close an already opened window
    closeWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        // Defensive check : If the window doesn't exist, do nothing
        if(!win) return;

        // Close the window and reset its zIndex
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
      }),

    // bring a window to the front if it is already opened
    focusWindow: (windowKey) =>
      set((state) => {
        const win = state.windows[windowKey];

        win.zIndex = state.nextZIndex += 1;
      }),
  }))
);

export default useWindowStore;