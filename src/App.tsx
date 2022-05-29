import React, {useMemo, useEffect, Suspense} from 'react';
// React router
import { Route, Routes, Navigate} from "react-router-dom";
import {CssBaseline, ThemeProvider, useMediaQuery, Box, Fab, createTheme } from '@mui/material';
import useAppSelector from './customHooks/useAppSelector';
import { handleSystemTheme } from './utils/utils';
import { projectTheme } from './config';
import Layout from './components/Laoyout/Layout';
import Home from './components/Home/Home';
import SuspenseFallback from './components/SuspenseFallback/SuspenseFallback';
import './App.scss';
import GamesList from './components/GamesList/GamesList';
import GamesOrder from './components/GamesOrder/GamesOrder';

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
              <Route path="/games-list" element={<GamesList title='List of games' />} />
              <Route path="/games-order" element={<GamesOrder title="Games order" />} />
              <Route path="/404" element={<div>Not found</div>} />
              <Route path="*" element={<Navigate to="/404" />}  />
            </Routes>
          </Layout>
        </Suspense>
       </ThemeProvider>
    </Box>
  );
}

export default App;
