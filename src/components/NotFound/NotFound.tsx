import {useEffect} from 'react';
// Project settings
import {ProjectTitle} from "../../config";
// Material UI
import {Box, Typography, Alert} from '@mui/material'
// Images
import image404 from '../../assets/images/404.png';
// Breadcrumbs
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

const NotFound = (): JSX.Element => {

    useEffect(() => {
        document.title = `Page 404 | ${ProjectTitle}`;
    }, []);

    return (
        <>
            <Box my={4} style={{textAlign: "center"}}>
                <Typography variant="h4" component="h1" gutterBottom>
                   Page 404
                </Typography>
            </Box>
           <Breadcrumbs currentLinkText="Page 404" />
            <Box mb={3}>
                <img src={image404} alt="image404" style={{margin: "auto"}} />
            </Box>
            <Box>
                <Alert variant="filled" severity="error" className={`align-items-center justify-content-center`}>
                    This page was not found :(
                </Alert>
            </Box>
        </>
    )
};

export default NotFound;