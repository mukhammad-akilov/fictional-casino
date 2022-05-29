import {configureStore} from "@reduxjs/toolkit";
import userSliceReducer from "./slices/gamesSlice";
import themeSliceReducer from "./slices/themeSlice";
import snackbarSliceReducer from "./slices/snackbarSlice";

const store = configureStore({
    reducer: {
        games: userSliceReducer,
        theme: themeSliceReducer,
        snackbar: snackbarSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;