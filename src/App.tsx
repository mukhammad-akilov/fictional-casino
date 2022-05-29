import React, {useMemo, useEffect, Suspense} from 'react';
// React router
import { Route, Routes, Navigate} from "react-router-dom";
import {CssBaseline, ThemeProvider, useMediaQuery, Box, Fab, createTheme } from '@mui/material';
import useAppSelector from './customHooks/useAppSelector';
import { handleSystemTheme } from './utils/utils';
import { projectTheme } from './config';
import Layout from './components/Laoyout/Layout';
import SuspenseFallback from './components/SuspenseFallback/SuspenseFallback';
import './App.scss';
// Lazy load components
// import { Home, GamesList, GamesOrder, NotFound } from './components/Lazy/Lazy';
import Home from "./components/Home/Home";
import GamesList from "./components/GamesList/GamesList";
import GamesOrder from "./components/GamesOrder/GamesOrder";
import NotFound from "./components/NotFound/NotFound";


const App = (): JSX.Element => {
  const themeState = useAppSelector((state) => state.theme);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const customTheme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: themeState.theme === "system" ? handleSystemTheme() : themeState.theme,
            primary: {
              main: projectTheme.primary.color,
              contrastText: projectTheme.primary.textColor,
            },

            secondary: {
              main: projectTheme.secondary.color,
              contrastText: projectTheme.secondary.textColor,
            },
          },
        },
      ),
    [themeState.theme, prefersDarkMode]
  );

  useEffect(() => {
    // Init app

  }, [])

  return (
    <Box
      className="app"
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "100vh"
      }}
    >
       <ThemeProvider theme={customTheme}>
         <CssBaseline />
         <Suspense fallback={<SuspenseFallback />}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/manage-games" element={<GamesList title="Manage games" />} />
              <Route path="/games-order" element={<GamesOrder title="Change games order" />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />}  />
            </Routes>
          </Layout>
        </Suspense>
       </ThemeProvider>
    </Box>
  );
}

export default App;
