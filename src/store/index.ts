import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import userSliceReducer from "./slices/gamesSlice";
import themeSliceReducer from "./slices/themeSlice";
import snackbarSliceReducer from "./slices/snackbarSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware  = createSagaMiddleware();
const store = configureStore({
    reducer: {
        games: userSliceReducer,
        theme: themeSliceReducer,
        snackbar: snackbarSliceReducer,
    },
    // middleware: [sagaMiddleware]
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ thunk: false })
        .concat(sagaMiddleware)
})

store.subscribe(() => {
  const gamesState = store.getState().games.gamesList;
  if(gamesState.length > 0 ) {
    localStorage.setItem("fictional-casino-games-list", JSON.stringify({value: gamesState}));
  }
});

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;