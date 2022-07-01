import {ReactEventHandler} from "react";

export interface INavigationPanelComponent {
    isOpen: boolean
    toggleDrawer: (isOpen: boolean) => ReactEventHandler
}