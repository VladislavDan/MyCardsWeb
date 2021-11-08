import * as React from 'react';
import {ChangeEvent, FC} from 'react';
import {Button, TextField} from '@mui/material';
import './CardsGroupsEditorComponent.css'

export const CardsGroupsEditorComponent: FC<ICardsGroupsEditorComponent> = ({groupName, onChangeGroupName, onSaveGroup}) => {

    const onChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChangeGroupName(event.target.value);
    };

    return <div className="group-editor">
        <TextField
            className="group-editor_text"
            required
            id="outlined-required"
            label="Group name"
            onChange={onChange}
            value={groupName}
            variant="filled"
        />
        <Button variant="outlined" className="group-editor_button" size="small" onClick={() => onSaveGroup()}>
            Save
        </Button>
    </div>
};

interface ICardsGroupsEditorComponent {
    groupName: string;
    onChangeGroupName: (groupName: string) => void;
    onSaveGroup: () => void;
}
