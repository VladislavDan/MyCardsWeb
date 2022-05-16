import * as React from 'react';
import {FC} from 'react';
import {Button, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import './CardsEditorComponent.css'
import {ISimplifiedCardsGroup} from '../../common/types/ISimplifiedCardsGroup';
import {TextEditorComponent} from '../../common/elements/text-editor/TextEditorComponent';

export const CardsEditorComponent: FC<ICardsGroupsEditorComponent> = (
    {
        answer,
        question,
        onChangeAnswer,
        onChangeQuestion,
        onSaveCard,
        cardsGroups,
        currentCardsGroup,
        onChangeCardsGroup
    }
) => {

    const changeGroup = (event: SelectChangeEvent) => {
        onChangeCardsGroup(Number(event.target.value));
    };

    return <div className="cards-editor">
        <TextEditorComponent onChangeText={onChangeQuestion} changeableText={question} label="Question"/>
        <TextEditorComponent onChangeText={onChangeAnswer} changeableText={answer} label="Answer"/>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="cards-editor_text"
            value={currentCardsGroup.id.toString()}
            label={currentCardsGroup.nameCardsGroup}
            onChange={changeGroup}
            autoWidth
        >
            {cardsGroups.map((cardsGroup: ISimplifiedCardsGroup) => (
                <MenuItem
                    key={cardsGroup.id}
                    value={cardsGroup.id.toString()}
                >
                    {cardsGroup.nameCardsGroup}
                </MenuItem>
            ))}
        </Select>
        <Button variant="outlined" className="group-editor_button" size="small" onClick={() => onSaveCard()}>
            Save
        </Button>
    </div>
};

interface ICardsGroupsEditorComponent {
    answer: string;
    question: string;
    onChangeAnswer: (answer: string) => void;
    onChangeQuestion: (question: string) => void;
    onSaveCard: () => void;
    currentCardsGroup: ISimplifiedCardsGroup;
    cardsGroups: ISimplifiedCardsGroup[];
    onChangeCardsGroup: (cardsGroupID: number) => void;
}
