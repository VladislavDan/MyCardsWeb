import * as React from "react";
import {FC} from "react";

import {ISelectingGroupListItem} from "./types/ISelectingGroupListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import {Checkbox, ListItem} from "@mui/material";

export const SelectingGroupListItem: FC<ISelectingGroupListItem> = (
    {cardsGroup, onSelect, isSelected}
) => {
    return <ListItem key={cardsGroup.id} button>
        <ListItemText
            primary={<div>{cardsGroup.nameCardsGroup}</div>}
        />
        <ListItemIcon onClick={() => onSelect(cardsGroup.id)}>
            <Checkbox
                edge="start"
                checked={isSelected}
                tabIndex={-1}
                disableRipple
            />
        </ListItemIcon>
    </ListItem>
}