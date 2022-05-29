import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {TableRow, TableCell, Box} from "@mui/material";
import { Game } from '../../interfaces/game.interface';
 // Images
import gameImage from '../../assets/images/game-thumbnail.jpg';
import useAppSelector from "../../customHooks/useAppSelector";

interface SortableGameProps {
    id: string;
}

const GameData = ({id, ...restprops}: {id: string}): JSX.Element => {
  const [gameData] = useAppSelector((state) => state.games.gamesList.filter(game => game.id === id));

  return (
    <>
      <TableCell>
              {gameData.title}
        </TableCell>
        <TableCell>
              <Box
                  component="img"
                  sx={{width: "100px", borderRadius: "50%"}}
                  src={gameImage} 
                  alt= {gameData.title}
              />
        </TableCell>
          <TableCell>
            {gameData.description}
          </TableCell>
    </>
  )
}

const SortableGame = ({id, ...restProps}: SortableGameProps): JSX.Element => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab"
  };
  
  return (
    <TableRow hover ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <GameData id={id} />
    </TableRow>
  );
}

export default SortableGame;