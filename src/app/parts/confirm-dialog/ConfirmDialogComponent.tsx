import React, {FC} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {IConfirmDialogComponent} from "./types/IConfirmDialogComponent";

export const ConfirmDialogComponent: FC<IConfirmDialogComponent> = ({
                                                                        onClickAgree,
                                                                        onClickDisagree,
                                                                        isOpen,
                                                                        message,
                                                                        onClose
                                                                    }) => {

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
