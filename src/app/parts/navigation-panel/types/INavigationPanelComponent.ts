import {ReactEventHandler} from "react";

export interface INavigationPanelComponent {
    isOpen: boolean
    toggleDrawer: ReactEventHandler
}