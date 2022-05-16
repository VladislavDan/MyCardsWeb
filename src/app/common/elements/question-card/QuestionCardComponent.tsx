import React, {FC} from 'react';

import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import {LongTextViewerComponent} from "../long-text-viewer/LongTextViewerComponent";
import {IQuestionCard} from "./types/IQuestionCard";
import {LongTextEditorComponent} from "../long-text-editor/LongTextEditorComponent";

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
                    <LongTextEditorComponent
                        text={question}
                        viewHeight={cardHeight}
                        onChangeText={onChangeQuestion}
                    />
                    :
                    <LongTextViewerComponent viewHeight={cardHeight} text={question}/>
            }
        </CardContent>
    </Card>
};
