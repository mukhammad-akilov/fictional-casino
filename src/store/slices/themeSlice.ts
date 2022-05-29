import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PaletteMode} from "@mui/material";

const dashboardThemeMode = localStorage.getItem("fictional-casino-theme-mode");

export enum MenuType {
    Fixed,
    Overlay
}

interface ThemeState {
    theme: PaletteMode | "system",
    menuType: MenuType,
}

const initialState: ThemeState = {
    theme: dashboardThemeMode ? JSON.parse(dashboardThemeMode).value as PaletteMode : "light",
    menuType: MenuType.Overlay,
};

// Slice
export const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        changeTheme: (state, action: PayloadAction<PaletteMode>) => {
            state.theme = action.payload;
        },
        // changeMenuType: (state, action: PayloadAction<MenuType>) => {
        //     state.menuType = action.payload;
        // },
    }
});

// Actions
export const themeActions = {
    changeTheme: themeSlice.actions.changeTheme,
}

export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;