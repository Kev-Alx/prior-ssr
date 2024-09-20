import { create } from "zustand";

type ScreenNames = "one" | "two" | "three";

interface MyState {
    activePanel: ScreenNames;
    setActivePanel: (newValue: ScreenNames) => void;
}

export const useAdminPage = create<MyState>((set) => ({
    activePanel: "one",
    setActivePanel: (newValue: ScreenNames) => set({ activePanel: newValue }),
}));

interface BlockState {
    theme: "light" | "dark";
    setTheme: (t: "light" | "dark") => void;
}

export const useBlockTheme = create<BlockState>((set) => ({
    theme: document.getElementsByTagName("html")[0].classList.contains("light")
        ? "light"
        : "dark",
    // window.matchMedia &&
    // window.matchMedia("(prefers-color-scheme: dark)").matches
    //     ? "dark"
    //     : "light",
    setTheme: (t: "light" | "dark") => set({ theme: t }),
}));

type SearchStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
};

export const useSearch = create<SearchStore>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    toggle: () => set({ isOpen: !get().isOpen }),
}));
