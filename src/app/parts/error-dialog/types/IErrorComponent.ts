export interface IErrorComponent {
    isOpen: boolean;
    errorMessage: string;
    handleClose: () => void;
}