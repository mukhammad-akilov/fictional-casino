import { LayoutProps } from "./Laoyt.props";
import { Box, Container } from "@mui/material";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SnackbarAlert from "../SnackbarAllert/SnackbarAllert";

const Layout = ({children}: LayoutProps) => {
    return (
        <>
            <Header/>
            <Box
                component="main"
            >
                <Container
                    maxWidth={false}
                    sx={{
                        paddingBottom: "32px"
                    }}
                >
                    {children}
                </Container>
            </Box>
            <Footer />
            <SnackbarAlert />
        </>
    )
}

export default Layout;