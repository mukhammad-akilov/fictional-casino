import {PaletteMode} from "@mui/material";
import { Game } from "../interfaces/game.interface";

export const userPrefersDarkMode = (): boolean => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const handleSystemTheme = (): PaletteMode => {
    if(userPrefersDarkMode()) return "dark";
    return "light";
}


export const handleThemeChangeToLocalStorage = (theme: PaletteMode): void => {
    localStorage.setItem("fictional-casino-theme-mode", JSON.stringify({value: theme}))
}

export const findGameById = (id: string, gamesList: Game[]): Game => {
    const [foundGame] = gamesList.filter(game => game.id === id);
    return foundGame;
}