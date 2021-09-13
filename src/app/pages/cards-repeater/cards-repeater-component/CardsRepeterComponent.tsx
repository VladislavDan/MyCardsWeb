import React, {FC, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import orange from '@material-ui/core/colors/orange';
import red from '@material-ui/core/colors/red';

import {ICard} from '../../../types/ICard';
import "./CardsRepeaterComponent.css"
import {Button, CardActions, List} from '@material-ui/core';
import {ExpandableTextComponent} from './expandable-text-component/ExpandableTextComponent';
import {IStatistic} from '../../../types/IStatistic';
import {RepeatingStatisticComponent} from './repeating-statistic-component/RepeatingStatisticComponent';

export const CardsRepeaterComponent: FC<ICardsRepeaterComponent> = ({card, isQuestionSide, onClickCard, onClick, statistic}) => {

    return <div className="cards-repeater">
        <RepeatingStatisticComponent statistic={statistic}/>
        {isQuestionSide ? <Card>
            <CardContent onClick={onClickCard}>
                <Typography gutterBottom variant="h5" component="h2">
                    Question
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {card.question}
                </Typography>
            </CardContent>
        </Card> : <Card className="cards-repeater">
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" onClick={() => onClickCard()}>
                    Answer
                </Typography>
                <ExpandableTextComponent text={card.answer} onClickText={() => onClickCard()}/>

                <CardActions className="cards-repeater_buttons-container">
                    <Button size="small" color="primary" onClick={() => onClick(true)}>
                        Yes
                    </Button>
                    <Button size="small" color="primary" onClick={() => onClick(false)}>
                        No
                    </Button>
                </CardActions>
            </CardContent>
        </Card>}
    </div>
};

interface ICardsRepeaterComponent {
    card: ICard
    onClick: (isUnderstandable: boolean) => void
    isQuestionSide: boolean,
    onClickCard: () => void
    statistic: IStatistic
}
