import * as React from 'react';
import {FC} from 'react';
import {Button} from '@mui/material';

import './CardsEditorComponent.css'
import {TextEditorComponent} from '../../common/elements/text-editor/TextEditorComponent';
import {ICardsEditorComponent} from "./types/ICardsEditorComponent";

export const CardsEditorComponent: FC<ICardsEditorComponent> = (
    {
        answer,
        question,
        onChangeAnswer,
        onChangeQuestion,
        onSaveCard
    }
) => {
    return <div className="cards-editor">
        <TextEditorComponent onChangeText={onChangeQuestion} changeableText={question} label="Question"/>
        <TextEditorComponent onChangeText={onChangeAnswer} changeableText={answer} label="Answer"/>
        <Button variant="outlined" className="group-editor_button" size="small" onClick={() => onSaveCard()}>
            Save
        </Button>
    </div>
};
