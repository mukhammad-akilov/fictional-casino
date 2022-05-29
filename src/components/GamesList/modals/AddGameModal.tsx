import React, {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {
Box,  Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions} from "@mui/material";
// Icons
import { Add} from "@mui/icons-material";
// Redux
import {handleSnackbar} from "../../../store/slices/snackbarSlice";
import { v4 as uuidv4 } from 'uuid';
import { Game } from "../../../interfaces/game.interface";
import {addGame} from "../../../store/slices/gamesSlice";

interface ValidateFields {
    title: boolean;
    description: boolean;
}

const AddGameModal = (): JSX.Element => {
    const dispatch = useDispatch();
    const titleInputRef = useRef<HTMLInputElement>(null);
    const [show, setShow] = useState<boolean>(false);
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
            const newGame: Game = {
                id: uuidv4(),
                title: title,
                description: description
            }
            dispatch(addGame(newGame));
            setShow(false);
            // Show message
            dispatch(handleSnackbar({
                open: true,
                message: "Game successfully added",
                type: "success",
            }));
        } catch (error) {
              // Show message
              dispatch(handleSnackbar({
                open: true,
                message: "Error occured while adding the game",
                type: "error",
            }));
        }
    }

    useEffect(() => {
        if (show) {
            setTitle("");
            setDescription("");
            setNotValidateField({
                title: false,
                description: false,
            });
        }
        titleInputRef.current?.focus();
    }, [show]);

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                endIcon={<Add />}
                onClick={() => setShow(true)}
            >
               Add game
            </Button>
            <Dialog fullWidth={true} open={show} onClose={() => setShow(false)} maxWidth="sm">
                <DialogTitle sx={{ textAlign: "center" }}>Adding a new game</DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleFormSubmit}>
                        <Box mb={3}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                inputRef={titleInputRef}
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
                                variant="contained"
                                color="primary"
                                disabled={validateForm()}
                            >
                                Add
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShow(false)} color="secondary" variant="contained">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default React.memo(AddGameModal);