import Typography from '@mui/material/Typography';
import React, {FC} from 'react';
import {List} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import {ICard} from '../../../types/ICard';
import {AnswerCardFooterComponent} from '../answer-card-footer/AnswerCardFooterComponent';
import {TextEditorComponent} from '../text-editor/TextEditorComponent';

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
                    <div
                        style={{paddingTop: 0, height: cardHeight, overflow: 'auto', whiteSpace: 'pre-wrap'}}>
                        <List style={{paddingTop: 0}}>
                            <TextEditorComponent onChangeText={onChangeAnswer} changeableText={getText()}/>
                        </List>
                    </div>
                    :
                    <>
                        <Typography color="textSecondary" gutterBottom onClick={onClickText}
                                    style={{
                                        paddingTop: 0,
                                        height: cardHeight,
                                        overflow: 'auto',
                                        whiteSpace: 'pre-wrap'
                                    }}>
                            <List style={{paddingTop: 0}}>
                                {getText()}
                            </List>
                        </Typography>
                        <AnswerCardFooterComponent onClick={onClick} card={card}/>
                    </>
            }
        </CardContent>
    </Card>
};

interface IAnswerCardComponent {
    card: ICard | undefined;
    onClickText: () => void
    cardHeight: number
    onClick: (isUnderstandable: boolean) => void;
    isEditable: boolean;
    onChangeAnswer: (answer: string) => void;
}
