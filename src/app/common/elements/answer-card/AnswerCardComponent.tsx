import React, {FC, useState} from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

import {AnswerCardFooterComponent} from '../answer-card-footer/AnswerCardFooterComponent';
import {IAnswerCardComponent} from './types/IAnswerCardComponent';
import {LongTextViewerComponent} from '../long-text-viewer/LongTextViewerComponent';
import {LongTextEditorComponent} from '../long-text-editor/LongTextEditorComponent';
import {DeleteButtonFooterComponent} from '../delete-button-footer/DeleteButtonFooterComponent';

export const AnswerCardComponent: FC<IAnswerCardComponent> = (
    {
        card,
        cardHeight,
        onClickText,
        onClickYesNoButton,
        isEditable,
        onChangeAnswer,
        onDeleteCard
    }
) => {
    const [actionStatus, setActionStatus] = useState<null | 'yes' | 'no'>(null);

    const getText = () => {
        return card ? card.answer : '';
    };

    const onClickButton = (arg: boolean) => {
        onClickYesNoButton(arg);
        setActionStatus(arg ? 'yes' : 'no');
    }

    const cardBackgroundColor = actionStatus === 'yes' ?
        'rgba(0,128,0,0.35)' :
        actionStatus === 'no' ? 'rgb(252,189,154)' : 'white'

    return <Card
        className="cards-repeater answer-card-component"
        style={{
            backgroundColor: cardBackgroundColor
        }}>
        <CardContent
            style={{
                height: cardHeight
            }}>
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
                        <AnswerCardFooterComponent onClickYesNoButton={onClickButton} card={card}/>
                    </>
            }
        </CardContent>
    </Card>
};
