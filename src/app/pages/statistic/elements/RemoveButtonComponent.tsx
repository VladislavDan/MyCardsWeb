import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";
import * as React from "react";
import {FC} from "react";

import './RemoveButtonComponent.css'
import {IRemoveButtonComponent} from "./types/IRemoveButtonComponent";

export const RemoveButtonComponent: FC<IRemoveButtonComponent> = ({onClick}) => {
    return <div className='remove-button-container'>
        <Fab size="medium" color="secondary" onClick={onClick}>
            <DeleteIcon/>
        </Fab>
    </div>
}