import {ChangeEvent, default as React, FC} from 'react';
import {TextField} from '@mui/material';

import './TextEditorComponent.css'
import {ITextEditorComponent} from "./types/ITextEditorComponent";

export const TextEditorComponent: FC<ITextEditorComponent> = ({onChangeText, changeableText, label}) => {

    const onChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChangeText(event.target.value);
    };

    return <TextField
        className="text-editor"
        required
        id="outlined-required"
        label={label || ""}
        multiline
        onChange={onChange}
        value={changeableText}
        variant="filled"
    />
};
