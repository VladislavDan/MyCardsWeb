import * as React from 'react';
import {ChangeEvent, FC} from 'react';
import {Button, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import './CardsEditorComponent.css'
import {ISimplifiedCardsGroup} from '../../types/ISimplifiedCardsGroup';

export const CardsEditorComponent: FC<ICardsGroupsEditorComponent> = ({
                                                                          answer,
                                                                          question,
                                                                          onChangeAnswer,
                                                                          onChangeQuestion,
                                                                          onSaveCard,
                                                                          cardsGroups,
                                                                          currentCardsGroup,
    onChangeCardsGroup
}) => {

    const changeAnswer = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChangeAnswer(event.target.value);
    };

    const changeQuestion = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        onChangeQuestion(event.target.value);
    };

    const changeGroup = (event: SelectChangeEvent) => {
        onChangeCardsGroup(Number(event.target.value));
    };

    return <div className="cards-editor">
        <TextField
            className="cards-editor_text"
            required
            id="outlined-required"
            label="Question"
            onChange={changeQuestion}
            value={question}
            variant="filled"
        />
        <TextField
            className="cards-editor_text"
            required
            id="outlined-required"
            label="Answer"
            onChange={changeAnswer}
            value={answer}
            variant="filled"
        />
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
