import React, {FC} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ConfirmDialogComponent: FC<IConfirmDialogComponent> = ({onClickAgree, onClickDisagree, isOpen, message, onClose}) => {

    return (
        <div>
            <Dialog
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={onClose}
            >
                <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClickDisagree} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={onClickAgree} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

interface IConfirmDialogComponent {
    onClickAgree: () => void;
    onClickDisagree: () => void;
    onClose: () => void;
    isOpen: boolean;
    message: string;
}
