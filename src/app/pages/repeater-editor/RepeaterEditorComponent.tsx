import * as React from "react";
import {FC} from "react";
import {Button} from "@mui/material";
import {FixedSizeList as List} from "react-window";

import './RepeaterEditorComponent.css'
import {IRepeaterEditorComponent} from "./types/IRepeaterEditorComponent";
import {SelectingGroupListItem} from "./elements/selecting-group-list-element/SelectingGroupListItem";

export const RepeaterEditorComponent: FC<IRepeaterEditorComponent> = (
    {onSaveRepeater, cardsGroups, height, onSelect, selectedGroups}
) => {
    return <>
        <List
            className="repeater-editor"
            itemData={cardsGroups}
            itemSize={55}
            itemCount={cardsGroups.length}
            overscanCount={5}
            height={height}
            width="100%"
        >
            {({index, style}: any) => {
                return <SelectingGroupListItem
                    cardsGroup={cardsGroups[index]}
                    onSelect={onSelect}
                    isSelected={selectedGroups[cardsGroups[index].id]}
                />
            }}
        </List>
        <Button variant="outlined" className="repeater-editor_button" size="small" onClick={onSaveRepeater}>
            Save
        </Button>
    </>
}