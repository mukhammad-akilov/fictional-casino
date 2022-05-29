import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {
Box,  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@mui/material";
// Icons
import { Add} from "@mui/icons-material";
// Redux
import {handleSnackbar} from "../../../store/slices/snackbarSlice";
import { Game } from "../../../interfaces/game.interface";
import {editGame} from "../../../store/slices/gamesSlice";
import { EditGameModalProps } from "./EditGameModal.props";

interface ValidateFields {
    title: boolean;
    description: boolean;
}

const EditGameModal = ({open, game, onClose, ...restProps}: EditGameModalProps): JSX.Element => {
    const dispatch = useDispatch();
    const [notValidateField, setNotValidateField] = useState<ValidateFields>({
        title: false,
        description: false,
    });
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const validateForm = (): boolean => {
        const validate = (title === "" || description === "") ;
        return validate;
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const changedGame: Game = {
                id: game.id,
                title: title,
                description: description
            }
            dispatch(editGame(changedGame));
            onClose();
            // Show message
            dispatch(handleSnackbar({
                open: true,
                message: "Game successfully changed",
                type: "success",
            }));
        } catch (error) {
              // Show message
              dispatch(handleSnackbar({
                open: true,
                message: "Error occured while changing the game",
                type: "error",
            }));
        }
    }

    useEffect(() => {
        if (open) {
            setTitle(game.title);
            setDescription(game.description);
            setNotValidateField({
                title: false,
                description: false,
            });
        }
    }, [open]);

    return (
        <>
            {game &&
                 <Dialog fullWidth={true} open={open} onClose={onClose} maxWidth="sm">
                 <DialogTitle sx={{ textAlign: "center" }}>Edit game ({game.title})</DialogTitle>
                 <DialogContent dividers>
                     <form onSubmit={handleFormSubmit}>
                         <Box mb={3}>
                             <TextField
                                 variant="outlined"
                                 required
                                 fullWidth
                                 label="Title"
                                 value={title}
                                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setTitle(e.target.value)}
                                 error={notValidateField.title && title === ""}
                                 helperText={notValidateField.title && title === "" ? "This field is required" : ""}
                                 onBlur={event => setNotValidateField(prevState => ({...prevState, title: true}))}
                                 onFocus={event => setNotValidateField(prevState => ({...prevState, title: false}))}
                             />
                         </Box>
                         <Box mb={3}>
                             <TextField
                                 variant="outlined"
                                 required
                                 fullWidth
                                 multiline
                                 rows={4}
                                 label="Description"
                                 value={description}
                                 onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setDescription(e.target.value)}
                                 error={notValidateField.description && description === ""}
                                 helperText={notValidateField.description && description === "" ? "This field is required" : ""}
                                 onBlur={event => setNotValidateField(prevState => ({...prevState, description: true}))}
                                 onFocus={event => setNotValidateField(prevState => ({...prevState, description: false}))}
                             />
                         </Box>
                         <Box  sx={{textAlign: "center"}}>
                             <Button
                                 type="submit"
                                 variant="outlined"
                                 color="primary"
                                 disabled={validateForm()}
                             >
                                 Edit
                             </Button>
                         </Box>
                     </form>
                 </DialogContent>
                 <DialogActions>
                     <Button onClick={onClose} color="secondary" variant="contained">
                         Close
                     </Button>
                 </DialogActions>
             </Dialog>
            }
        </>
    )
}

export default React.memo(EditGameModal);