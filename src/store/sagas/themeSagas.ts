import {PaletteMode} from "@mui/material";
import { SagaIterator } from '@redux-saga/core'
import { call, put, takeEvery } from 'redux-saga/effects'
import {themeActions} from "../slices/themeSlice"

export function* onThemeChange({payload}: { type: "theme/changeTheme", payload: PaletteMode }): SagaIterator {
   console.log("Saga trigger", payload);
   // Save value in localStorage
   localStorage.setItem("fictional-casino-theme-mode", JSON.stringify({value: payload}));
   // Yield value
   // TODO infinite loop
//    yield put(themeActions.changeTheme(payload));
}

// Watcher Saga
export function* postsWatcherSaga(): SagaIterator {
    yield takeEvery("theme/changeTheme", onThemeChange)
}
  
  export default postsWatcherSaga