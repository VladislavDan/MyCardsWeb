import {ReactElement} from "react";

export interface IConfirmDialogComponent {
    onClickAgree: () => void;
    onClickDisagree: () => void;
    onClose: () => void;
    isOpen: boolean;
    message: string;
    titleBackgroundColor?: 'grey' | 'red' | 'green' | 'orange';
    icon?: ReactElement | null
}