export interface IConfirmDialogComponent {
    onClickAgree: () => void;
    onClickDisagree: () => void;
    onClose: () => void;
    isOpen: boolean;
    message: string;
}