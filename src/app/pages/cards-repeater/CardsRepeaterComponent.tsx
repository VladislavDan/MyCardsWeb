import React, {FC} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Button, CardActions, IconButton} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import {ICard} from '../../types/ICard';
import {StatisticComponent} from './elements/statistic/StatisticComponent';
import {AnswerComponent} from './elements/answer/AnswerComponent';
import "./CardsRepeaterComponent.css"
import {IStatistic} from '../../types/IStatistic';
import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';

export const CardsRepeaterComponent: FC<ICardsRepeaterComponent> = (
    {
        card,
        answerCardHeight,
        isQuestionSide,
        onClickCard,
        onClick,
        statistic,
        onEditCard,
        onBackClick
    }
) => {

    return card ? <div className="cards-repeater">
            <StatisticComponent statistic={statistic}/>

            <div className="cards-repeater_title">
                <Typography gutterBottom variant="h5" component="h2">
                    {isQuestionSide ? 'Question' : 'Answer'}
                </Typography>
                <IconButton color="inherit" onClick={onEditCard}>
                    <EditIcon/>
                </IconButton>
            </div>

            {isQuestionSide ? <Card>
                <CardContent onClick={onClickCard} style={{height: answerCardHeight}}>
                    <Typography color="textSecondary" gutterBottom>
                        {card.question}
                    </Typography>
                </CardContent>
            </Card> : <Card className="cards-repeater">
                <CardContent style={{height: answerCardHeight}}>
                    <AnswerComponent height={answerCardHeight - 20} text={card.answer} onClickText={() => onClickCard()}/>
                    { card.rangeOfKnowledge !== IRangeOfKnowledge.DONE ? <CardActions className="cards-repeater_buttons-container">
                        <Button size="small" color="primary" onClick={() => onClick(true)}>
                            Yes
                        </Button>
                        <Button size="small" color="primary" onClick={() => onClick(false)}>
                            No
                        </Button>
                    </CardActions> : <div>Repeated</div> }
                </CardContent>
            </Card>}
        </div> :
        <>
            <span>All cards repeated</span>
            <Button size="small" color="primary" onClick={onBackClick}>
                Go back
            </Button>
        </>
};

interface ICardsRepeaterComponent {
    card: ICard | undefined;
    onClick: (isUnderstandable: boolean) => void;
    isQuestionSide: boolean;
    onClickCard: () => void;
    statistic: IStatistic;
    answerCardHeight: number;
    onEditCard: () => void;
    onBackClick: () => void;
}
