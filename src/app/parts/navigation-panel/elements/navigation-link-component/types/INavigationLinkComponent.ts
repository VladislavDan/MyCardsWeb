import {ReactEventHandler} from "react";

export interface INavigationLinkComponent {
    path: string;
    name: string;
    toggleDrawer: (isOpen: boolean) => ReactEventHandler
}