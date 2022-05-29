import {Game} from "../../../interfaces/game.interface"

export interface EditGameModalProps {
    open: boolean;
    game: Game;
    onClose: () => void;
}