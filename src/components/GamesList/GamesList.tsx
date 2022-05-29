import { useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import useAppSelector from "../../customHooks/useAppSelector";
import { GamesListProps } from "./GamesList.props";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Tooltip from "../Tooltip/Tooltip";
import { Game } from "../../interfaces/game.interface";
import {deleteGame} from "../../store/slices/gamesSlice";
import { ProjectTitle } from "../../config";
import {TableContainer, Alert, Paper, Typography, Box, Table, TableBody, TableCell, TableRow, TableHead, IconButton} from "@mui/material";
// Icons
import {Edit, Delete} from "@mui/icons-material"
// Modals
import AddGameModal from "./modals/AddGameModal";
import EditGameModal from "./modals/EditGameModal";
// Images
import gameImage from '../../assets/images/game-thumbnail.jpg';

const tableColumns = ["Title", "Thumbnail", "Description", "Actions"];

const GamesList = ({title = "Fictional Casino", ...restProps}: GamesListProps) => {
    const dispatch = useDispatch();
    const gamesList = useAppSelector((state) => state.games.gamesList);
    const [selectedGame, setSelectedGame] = useState<Partial<Game>>({});
    const [openGameEditModal, setOpenGameEditModal] = useState<boolean>(false);
    
    useEffect(() => {
        document.title = `${title} | ${ProjectTitle}`;
    }, [])

    return (
        <>
        <Box my={4} style={{textAlign: "center"}}>
            <Typography variant="h4" component="h1">
                {title}
            </Typography>
        </Box>
        <Breadcrumbs currentLinkText={title} />
        <Box mb={3}>
            <AddGameModal />
        </Box>
        {
            gamesList.length > 0 ? (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{backgroundColor: theme => theme.palette.secondary.main}}>
                                <TableRow>
                                    {tableColumns.map((column, index) => (
                                        <TableCell
                                            key={index}
                                            sx={{
                                                fontWeight: 700,
                                                color: "#000000"
                                            }}
                                        >
                                            {column}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {gamesList.map(game => (
                                    <TableRow
                                        hover
                                        key={game.id}
                                    >
                                        <TableCell>
                                            {game.title}
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                component="img"
                                                sx={{width: "100px", borderRadius: "50%"}}
                                                src={gameImage} 
                                                alt={game.title} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {game.description}
                                        </TableCell>
                                        <TableCell>
                                            <Typography noWrap>
                                                <Tooltip title="Edit">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => {setSelectedGame(game); setOpenGameEditModal(true)}}
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => dispatch(deleteGame(game.id))}
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Tooltip>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <EditGameModal 
                        open={openGameEditModal}
                        game={selectedGame as Game}
                        onClose={() => setOpenGameEditModal(false)}
                    />
                </>

            )
            :
            <Alert severity="warning">No games added</Alert>
        }
    </>
    )
}

export default GamesList;