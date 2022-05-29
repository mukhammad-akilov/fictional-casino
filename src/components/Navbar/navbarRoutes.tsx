import React from "react";
import { Home as HomeIcon, Payment,PersonAdd } from "@mui/icons-material";

export interface NavbarLink {
    title: string,
    link: string,
    icon: JSX.Element,
    type: string
}

export interface NavbarRoute {
    title: string,
    link?: string,
    icon: React.ReactNode,
    type: NavbarItemType,
    openValue?: boolean,
    openFunc?: (state: boolean) => void;
    links?: NavbarLink []
}

export enum NavbarItemType {Link, Dropdown, Divider}

const navbarRoutes: NavbarRoute[] = [
    {
      title: "Home",
      link: "/",
      icon: <HomeIcon color="primary" />,
      type: NavbarItemType.Link,
    },
    {
      title: "Games List",
      link: "/games-list",
      icon: <Payment color="primary" />,
      type: NavbarItemType.Link,
    },
    {
      title: "Games order",
      link: "/games-order",
      icon: <Payment color="primary" />,
      type: NavbarItemType.Link,
    }
  ];

export default  navbarRoutes;