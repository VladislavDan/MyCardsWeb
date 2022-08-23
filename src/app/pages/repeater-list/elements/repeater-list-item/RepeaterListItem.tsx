import React, {FC} from "react";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItem from "@mui/material/ListItem";

import {IRepeaterListItem} from "./types/IRepeaterListItem";
import {ListItemMenuComponent} from "../../../../common/elements/list-item-menu/ListItemMenuComponent";
import {
    CircularProgressComponent
} from "../../../cards-groups-list/elements/circular-progress/CircularProgressComponent";

export const RepeaterListItem: FC<IRepeaterListItem> = (
    {
        repeater,
        onStartRepeating,
        onDeleteRepeater,
        onResetProgress,
        onEditItem
    }
) => {

    return <ListItem key={repeater.id} button component="div">
        <ListItemIcon onClick={() => onStartRepeating(repeater.id)}>
            <CircularProgressComponent percent={repeater.percentRepeatedCards || 0}/>
        </ListItemIcon>
        <ListItemText
            className="repeater-list-item_content"
            primary={repeater.name}
            onClick={() => onStartRepeating(repeater.id)}
        />
        <ListItemIcon>
            <ListItemMenuComponent
                onEdit={() => onEditItem(repeater.id)}
                onDelete={() => onDeleteRepeater(repeater.id)}
                onResetProgress={() => onResetProgress(repeater.id)}
            />
        </ListItemIcon>
    </ListItem>
}