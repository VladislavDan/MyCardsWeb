import React, {FC} from "react";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";

import {IRepeaterListItem} from "./types/IRepeaterListItem";

export const RepeaterListItem: FC<IRepeaterListItem> = (
    {repeater, onStartRepeating, onDeleteRepeater}
) => {

    return <ListItem key={repeater.id} button component="div">
        <ListItemIcon onClick={() => onStartRepeating(repeater.id)}>
            <PlayArrowIcon/>
        </ListItemIcon>
        <ListItemText
            className="repeater-list-item_content"
            primary={repeater.name}
        />
        <ListItemIcon>
            <DeleteIcon onClick={() => onDeleteRepeater(repeater.id)}/>
        </ListItemIcon>
    </ListItem>
}