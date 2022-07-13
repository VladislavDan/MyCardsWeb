import {ReactElement} from "react";

export interface ConfirmDialogContainerState {
    isOpen: boolean;
    message: string;
    icon: ReactElement | null;
    titleBackgroundColor: 'red' | 'orange' | 'green' | 'grey';
}