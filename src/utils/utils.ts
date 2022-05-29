import {PaletteMode} from "@mui/material";

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

export const normalizePhoneNumber = (phoneNumber: string): string => {
    phoneNumber = phoneNumber.replace(/-/g, "");
    phoneNumber = phoneNumber.replace(/ /g, "");
    phoneNumber = phoneNumber.replace("+", "");
    phoneNumber = phoneNumber.replace("(", "");
    phoneNumber = phoneNumber.replace(")", "");
    phoneNumber = phoneNumber.trim();
    return phoneNumber;
}