import * as React from 'react';
import {ChangeEvent, FC} from 'react';
import {Button, TextField} from '@mui/material';
import {FixedSizeList as List} from 'react-window';

import './RepeaterEditorComponent.css'
import {IRepeaterEditorComponent} from './types/IRepeaterEditorComponent';
import {SelectingGroupListItem} from './elements/selecting-group-list-element/SelectingGroupListItem';

export const RepeaterEditorComponent: FC<IRepeaterEditorComponent> = (
    {
        onSaveRepeater,
        cardsGroups,
        height,
        onSelect,
        selectedGroups,
        onChangeName,
        repeaterName
    }
) => {

    const onChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChangeName(event.target.value);
    };

    return <>
        <TextField
            className="repeater-editor_text"
            required
            id="outlined-required"
            label="Repeater name"
            onChange={onChange}
            value={repeaterName}
            variant="filled"
        />
        <List
            className="repeater-editor_list"
            itemData={cardsGroups}
            itemSize={55}
            itemCount={cardsGroups.length}
            overscanCount={5}
            height={height - 500}
            width="100%"
        >
            {({index, style}: any) => {
                return <div style={style}><SelectingGroupListItem
                    cardsGroup={cardsGroups[index]}
                    onSelect={onSelect}
                    isSelected={selectedGroups[cardsGroups[index].id]}
                /></div>
            }}
        </List>
        <Button variant="outlined" className="repeater-editor_button" size="small" onClick={onSaveRepeater}>
            Save
        </Button>
    </>
}