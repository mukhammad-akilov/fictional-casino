// React
import { useState, useMemo, useEffect} from "react";
import { ProjectTitle } from "../../config";
// DND
import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, DragEndEvent
  } from '@dnd-kit/core';
  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
// Redux
import {useDispatch} from "react-redux";
import useAppSelector from "../../customHooks/useAppSelector";
import { editGamesSort } from "../../store/slices/gamesSlice";
import { handleSnackbar } from "../../store/slices/snackbarSlice";
// Props
import { GamesOrderProps } from "./GamesOrder.props";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import {TableContainer, Alert, Paper, Button, Typography, Box, Table, TableBody, TableCell, TableRow, TableHead, IconButton} from "@mui/material";
import SortableGame from "./SortableGame";

const tableColumns = ["Title", "Thumbnail", "Description"];

const GamesList = ({title = "Games order", ...restProps}: GamesOrderProps) => {
    const dispatch = useDispatch();
    const gamesList = useAppSelector((state) => state.games.gamesList);
    const [gamesListIds, setGamesListIds] = useState<string[]>([]);
    const localGamesListIdsMemo = useMemo(() => gamesListIds.map((id) => id), [gamesListIds]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );
    
    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        
        if (active.id !== over?.id) {
          setGamesListIds((items) => {
            const oldIndex = items.indexOf(active.id as string);
            const newIndex = items.indexOf(over?.id as string);            
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }

      const saveOrderedGames = () => {
        dispatch(editGamesSort(gamesListIds));
        // Show message
        dispatch(handleSnackbar({
            open: true,
            message: "Games were successfully sorted",
            type: "success",
        }));
      }

      useEffect(() => {
          const gamesIds = gamesList.map(game => game.id);
          setGamesListIds(gamesIds);
      }, [gamesList])

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
            <Alert severity="info">In this page you can change games sort by drag and drop. After you finish your job, just click "Save order" button</Alert>
        </Box>
        <Box mb={3}>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={saveOrderedGames}
                disabled={gamesList.length === 0}
            >
                Save games order
            </Button>
        </Box>
        {
            gamesList.length > 0 ? (
                <>
                    <TableContainer 
                        component={Paper} 
                        sx={{overflow: "hidden"}}
                    >
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
                                <DndContext 
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext 
                                        items={gamesListIds}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {gamesListIds.map(id => <SortableGame key={id} id={id} />)}
                                    </SortableContext>
                            </DndContext>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )
            :
            <Alert severity="warning">No games added. Go to this link to add a new game</Alert>
        }
    </>
    )
}

export default GamesList;