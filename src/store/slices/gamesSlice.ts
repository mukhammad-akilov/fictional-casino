import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Game} from "../../interfaces/game.interface";
import { findGameById } from "../../utils/utils";
const gamesList = localStorage.getItem("dashboard-games-list");

interface GamesState {
    gamesList: Game[],
}

const initialState: GamesState = {
    gamesList: [],
};

export const gamesSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        addGame: (state, action: PayloadAction<Game>) => {
            state.gamesList.push(action.payload);
        },
        editGame: (state, action: PayloadAction<Game>) => {
           const changedGame = action.payload;
           const changedGamesList = state.gamesList.map(game => game.id !== changedGame.id 
                ? game 
                : 
                {...game, title: changedGame.title, description: changedGame.description}
            );
            state.gamesList = changedGamesList;
        },
        deleteGame: (state, action: PayloadAction<string>) => {
            const deletedGameId = action.payload;
            const changedGamesList = state.gamesList.filter(game => game.id !== deletedGameId);
            state.gamesList = changedGamesList;
        },
        editGamesSort: (state, action: PayloadAction<string[]>) => {
            const sortedGames: Game[] = [];
            for(let gameId of action.payload) {
                const game = findGameById(gameId, state.gamesList);
                sortedGames.push(game);
            }
            state.gamesList = sortedGames;
        }
    }
});

export const {addGame, editGame, deleteGame, editGamesSort} = gamesSlice.actions;

export default gamesSlice.reducer;