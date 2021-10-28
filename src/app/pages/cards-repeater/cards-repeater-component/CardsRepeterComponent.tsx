import React, {FC} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import {ICard} from '../../../types/ICard';
import "./CardsRepeaterComponent.css"
import {Button, CardActions} from '@mui/material';
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
