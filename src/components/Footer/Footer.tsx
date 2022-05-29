// Material UI
import {Box, Typography, Theme} from "@mui/material";
// Project settings
import {ProjectTitle} from "../../config";
// Images
import projectLogo from '../../assets/images/casino.svg';

const Footer = (): JSX.Element => {
    return (
        <Box
            component="footer"
            sx={{
                color: "#FFFFFF",
                backgroundColor:(theme: Theme) => theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.primary.main,
                marginTop: "auto",
                padding: "2rem 0",
            }}
        >
            <Box mb={2}>
                <Box
                    component="img"
                    src={projectLogo}
                    alt="Fictional Casino"
                    sx={{ 
                        width: "100px", 
                        margin: "auto",
                        display: "block"
                    }}
                />
            </Box>
            <Box>
                <Typography component="p" align="center">
                    {ProjectTitle} {new Date().getFullYear()}. All rights reserved
                </Typography>
            </Box>
        </Box>
    );
};

export default  Footer;