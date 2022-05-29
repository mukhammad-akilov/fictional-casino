import React from "react";
// Redux
import {useDispatch} from "react-redux";
import {changeTheme} from "../../../store/slices/themeSlice";
import useAppSelector from "../../../customHooks/useAppSelector";
// Material UI
import {
    Drawer,
    Box,
    ToggleButtonGroup,
    ToggleButton,
    Typography,
    Divider,
    IconButton,
    PaletteMode
} from "@mui/material";

import Tooltip from "../../Tooltip/Tooltip";

// Icons
import {LightMode, DarkMode, SettingsBrightness, Close} from "@mui/icons-material";
import {SettingsModalProps} from "./SettingsModal.props";

const SettingsModal = ({open, onClose, ...props}: SettingsModalProps): JSX.Element => {
    const dispatch = useDispatch();
    const settingsState = useAppSelector(state => state.theme);

    const handleThemeChange = (event: React.MouseEvent<HTMLElement>, newTheme: PaletteMode | null): void => {
        if(newTheme !== null) {
            dispatch(changeTheme(newTheme));
        }
    };

    return (
        <Drawer
            open={open}
            anchor="right"
            onClose={onClose}
        >
            <Box sx={{ width: "400px"}} p={2}>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant="h6"  component="h5">
                       Dashborad settings
                    </Typography>
                    <Tooltip title="Close">
                        <IconButton color="primary" onClick={onClose}>
                            <Close color="primary" />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider sx={{margin: "15px 0"}} />
                <Box mb={2}>
                    <Typography variant="subtitle1"  component="p">
                        Color mode
                    </Typography>
                </Box>
                <Box>
                    <ToggleButtonGroup
                        color="primary"
                        value={settingsState.theme}
                        exclusive
                        onChange={handleThemeChange}
                        sx={{display: "flex"}}
                    >
                        <ToggleButton sx={{textTransform: "none", flexGrow: 1, display: "flex", gap: "5px"}} value="light">
                           <LightMode />
                            Light
                        </ToggleButton>
                        <ToggleButton sx={{textTransform: "none", flexGrow: 1, display: "flex", gap: "5px"}} value="system">
                            <SettingsBrightness />
                            System
                        </ToggleButton>
                        <ToggleButton sx={{textTransform: "none", flexGrow: 1, display: "flex", gap: "5px"}} value="dark">
                            <DarkMode />
                            Dark
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>
        </Drawer>
    )
}

export default SettingsModal;