import React, {FC} from 'react';
import Dialog from '@mui/material/Dialog';
import {List, ListItem, ListItemText} from "@mui/material";
import {ISelectionDialogComponent} from "./types/ISelectionDialogComponent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export const SelectionDialogComponent: FC<ISelectionDialogComponent> = (
    {
        isOpen,
        onClose,
        onClickItem,
        selectionItems,
        title
    }
) => {

    return (
        <div>
            <Dialog
                open={isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onClose={onClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <List>
                        {
                            selectionItems.map((item) => {
                                return <ListItem key={item.id} onClick={() => onClickItem(item.id)}>
                                    <ListItemText primary={item.label}/>
                                </ListItem>
                            })
                        }
                    </List>
                </DialogContent>
            </Dialog>
        </div>
    );
};
