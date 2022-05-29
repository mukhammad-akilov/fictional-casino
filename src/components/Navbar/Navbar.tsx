import React, {Fragment, useState} from 'react';
// Redux
import {useDispatch} from "react-redux";
import useAppSelector from "../../customHooks/useAppSelector";
// TS types
import navbarRoutes, {NavbarItemType, NavbarLink, NavbarRoute} from "./navbarRoutes";
// Project settings
import {ProjectTitle} from "../../config";
// React router
import {Link as RouterLink, useLocation, useNavigate} from 'react-router-dom';
// Material UI
import {AppBar, Box, Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography
} from '@mui/material';
// import {motion} from "framer-motion";
// Tooltip
import Tooltip from "../Tooltip/Tooltip";
// Icons
import {AccountCircle, ExitToApp, ExpandLess, ExpandMore, Menu as MenuIcon, Settings} from "@mui/icons-material";
// Images
import projectLogo from '../../assets/images/casino.svg';
// Modals
import SettingsModal from "./modals/SettingsModal";

const Navbar = () => {
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // Modals
    const [openSettingsModal, setOpenSettingsModal] = useState<boolean>(false);

    const childIsActive = (children: NavbarLink[] | undefined): boolean => {
        if(children !== undefined) {
            const result = children.filter((child: NavbarLink) => location.pathname === child.link);
            return result.length > 0;
        }
        return false;
    };


    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent): void => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };

    const SideList = (): JSX.Element => {
        return (
            <Box
                sx={{ width: "280px"}}
                role="presentation"
                // onClick={event => {toggleDrawer( false); alert("Click")}}
                onClick={toggleDrawer( false)}
                onKeyDown={toggleDrawer( false)}
            >
                    <List component="nav">
                        {navbarRoutes.map((navbarItem: NavbarRoute, index: number): JSX.Element | null => {
                            switch(navbarItem.type) {
                                case NavbarItemType.Link:
                                    return (
                                        <Fragment
                                            key={index}
                                        >
                                            <ListItemButton
                                                component={RouterLink}
                                                to={navbarItem.link!}
                                                // onClick={(event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault()}
                                                selected={location.pathname === navbarItem.link}
                                                // sx={{pointerEvents: "auto!important"}}
                                            >
                                                <ListItemIcon>{navbarItem.icon}</ListItemIcon>
                                                    <ListItemText primary={navbarItem.title} />
                                                </ListItemButton>
                                        </Fragment>
                                    )
                                case NavbarItemType.Dropdown:
                                    return (
                                        <Fragment key={index}>
                                            <ListItemButton
                                                selected={childIsActive(navbarItem.links)}
                                                onClick={(e: React.MouseEvent) => {navbarItem.openFunc?.(!navbarItem.openValue); e.stopPropagation();}}
                                            >
                                                <ListItemIcon>{navbarItem.icon}</ListItemIcon>
                                                <ListItemText primary={navbarItem.title} />
                                                {navbarItem.openValue ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={navbarItem.openValue} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {navbarItem.links?.map((nestedLink, counter) => (
                                                        <ListItemButton
                                                            sx={{paddingLeft: (theme: Theme) => theme.spacing(4)}}
                                                            component={RouterLink}
                                                            to={nestedLink.link}
                                                            selected={location.pathname === nestedLink.link}
                                                            key={counter}
                                                        >
                                                            <ListItemIcon>{nestedLink.icon}</ListItemIcon>
                                                            <ListItemText primary={nestedLink.title} />
                                                        </ListItemButton>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </Fragment>
                                    );
                                case NavbarItemType.Divider:
                                    return (
                                        <Divider sx={{margin: "12px 0"}} key={index} />
                                    );
                                default:
                                    return null;
                            }
                        })}
                    </List>
            </Box>
        )
    };

    return (
            <>
                <AppBar position="sticky">
                    <Toolbar sx={{minHeight: "70px!important"}}>
                        <IconButton
                            edge="start"
                            sx={{marginRight: (theme: Theme) => theme.spacing(2)}}
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer( true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box
                            component="img"
                            src={projectLogo}
                            alt={ProjectTitle}
                            sx={{  width: "40px", marginRight: "10px"}}
                        />
                        <Typography variant="h6" sx={{flexGrow: 1, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap",}}>
                            {ProjectTitle}
                        </Typography>
                        <Box sx={{ display: "flex"}}>
                            <Tooltip title="Dashboard settings">
                                <IconButton
                                    size="large"
                                    aria-label="show dashboard settings"
                                    color="inherit"
                                    onClick={() => setOpenSettingsModal(true)}
                                >
                                    <Settings />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={openDrawer}
                    onClose={toggleDrawer( false)}
                    // variant="persistent"
                >
                   <SideList />
                </Drawer>
                <SettingsModal
                    open={openSettingsModal}
                    onClose={() => setOpenSettingsModal(false)}
                />
            </>
        );
};

export default  Navbar;