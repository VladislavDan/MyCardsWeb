import React, {FC} from 'react';

import {List} from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import {ICard} from '../../../types/ICard';
import {TextEditorComponent} from '../text-editor/TextEditorComponent';

export const QuestionCardComponent: FC<IQuestionCard> = (
    {
        card,
        onClickCard,
        cardHeight,
        isEditable,
        onChangeQuestion
    }
) => {

    const question = card ? card.question : '';

    return <Card>
        <CardContent onClick={onClickCard} style={{height: cardHeight}}>
            {
                isEditable ?
                    <div style={{paddingTop: 0, height: cardHeight, overflow: 'auto', whiteSpace: 'pre-wrap'}}>
                        <List style={{paddingTop: 0}}>
                            <TextEditorComponent onChangeText={onChangeQuestion} changeableText={question}/>
                        </List>
                    </div> :
                    <Typography color="textSecondary" gutterBottom>
                        {question}
                    </Typography>
            }
        </CardContent>
    </Card>
};

interface IQuestionCard {
    card: ICard | undefined;
    onClickCard: () => void;
    cardHeight: number;
    isEditable: boolean;
    onChangeQuestion: (question: string) => void;
}
