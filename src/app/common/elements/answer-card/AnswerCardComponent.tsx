import React, {FC} from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import {AnswerCardFooterComponent} from '../answer-card-footer/AnswerCardFooterComponent';
import {IAnswerCardComponent} from "./types/IAnswerCardComponent";
import {LongTextViewerComponent} from "../long-text-viewer/LongTextViewerComponent";
import {LongTextEditorComponent} from "../long-text-editor/LongTextEditorComponent";

export const AnswerCardComponent: FC<IAnswerCardComponent> = (
    {
        card,
        cardHeight,
        onClickText,
        onClick,
        isEditable,
        onChangeAnswer
    }
) => {

    const getText = () => {
        return card ? card.answer : '';
    };

    return <Card className="cards-repeater">
        <CardContent style={{height: cardHeight}}>
            {
                isEditable ?
                    <LongTextEditorComponent
                        text={getText()}
                        viewHeight={cardHeight}
                        onChangeText={onChangeAnswer}
                    />
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
