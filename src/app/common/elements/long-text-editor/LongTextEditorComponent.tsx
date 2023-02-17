import React, {FC} from 'react';

import {TextEditorComponent} from '../text-editor/TextEditorComponent';
import {ILongTextEditorComponent} from './types/ILongTextEditorComponent';
import './LongTextEditorComponent.css'

export const LongTextEditorComponent: FC<ILongTextEditorComponent> = (
    {
        viewHeight,
        text,
        onChangeText
    }
) => {
    return <div
        className="long-text-editor"
        style={{
            height: viewHeight - 20
        }}
    >
        <TextEditorComponent onChangeText={onChangeText} changeableText={text}/>
    </div>
}