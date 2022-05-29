import { useEffect } from "react";
import useAppSelector from "../../customHooks/useAppSelector";
import { ProjectTitle } from "../../config";
import { Link as RouterLink } from 'react-router-dom';
import {Box, Typography, Grid, Alert, Link, Paper} from "@mui/material";
// Images
import gameImage from '../../assets/images/game-thumbnail.jpg';

const Home = () => {
    const gamesList = useAppSelector((state) => state.games.gamesList);

    useEffect(() => {
        document.title = `Home | ${ProjectTitle}`;
    }, [])

    return (
        <>
            <Box my={4} style={{textAlign: "center"}}>
                <Typography variant="h4" component="h1">
                    Games List
                </Typography>
            </Box>
            {gamesList.length > 0 ?
                    <Grid container  spacing={4}>
                        {gamesList.map(game => (
                            <Grid 
                                item 
                                xs={12}
                                sm={6} 
                                md={4} 
                                key={game.id}
                            >
                                <Paper
                                    sx={{
                                    padding: "15px",
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? '#1A2027' : '#FFFFFF',
                                    }}
                                >
                                    <Box mb={3} >
                                        <Box
                                            component="img"
                                            sx={{width: "200px", borderRadius: "50%", margin: "auto"}}
                                            src={gameImage} 
                                            alt={game.title} 
                                        />
                                    </Box>
                                    <Box mb={1}>
                                        <Typography variant="h6" component="h3" align="center">
                                            {game.title}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" component="p" align="center">
                                            {game.description}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>      
                        ))}
                    </Grid>
                :
                <Alert severity="warning">
                    {`
                        No games added. Go to 
                    `}
                    <Link
                        color="inherit"
                        to="/manage-games"
                        component={RouterLink}
                    >
                        Manage games
                    </Link> 
                    {` link to add a new game`}
                </Alert>
            }
            
        </>
    )
}

export default Home;