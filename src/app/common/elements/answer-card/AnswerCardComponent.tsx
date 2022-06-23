import React, {FC} from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import {AnswerCardFooterComponent} from '../answer-card-footer/AnswerCardFooterComponent';
import {IAnswerCardComponent} from "./types/IAnswerCardComponent";
import {LongTextViewerComponent} from "../long-text-viewer/LongTextViewerComponent";
import {LongTextEditorComponent} from "../long-text-editor/LongTextEditorComponent";
import {DeleteButtonFooterComponent} from "../delete-button-footer/DeleteButtonFooterComponent";

export const AnswerCardComponent: FC<IAnswerCardComponent> = (
    {
        card,
        cardHeight,
        onClickText,
        onClick,
        isEditable,
        onChangeAnswer,
        onDeleteCard
    }
) => {

    const getText = () => {
        return card ? card.answer : '';
    };

    return <Card className="cards-repeater">
        <CardContent style={{height: cardHeight}}>
            {
                isEditable ?
                    <>
                        <LongTextEditorComponent
                            text={getText()}
                            viewHeight={cardHeight}
                            onChangeText={onChangeAnswer}
                        />
                        <DeleteButtonFooterComponent onClick={onDeleteCard}/>
                    </>
                    :
                    <>
                        <LongTextViewerComponent
                            viewHeight={cardHeight}
                            text={getText()}
                            onClickText={onClickText}
                        />
                        <AnswerCardFooterComponent onClick={onClick} card={card}/>
                    </>
            }
        </CardContent>
    </Card>
};
