import DialogTitle from "@mui/material/DialogTitle";
import React, {FC} from "react";

import {IDialogTitleComponent} from "./types/IDialogTitleComponent";
import './DialogTitleComponent.css'

export const DialogTitleComponent: FC<IDialogTitleComponent> = (
    {
        titleBackgroundColor = 'grey',
        icon = null
    }
) => {
    return <DialogTitle
        id="alert-dialog-title"
        style={
            {
                backgroundColor: titleBackgroundColor,
                color: 'white'
            }
        }
    >
        <div className="dialog-title_value">
            Warning {icon}
        </div>
    </DialogTitle>
}