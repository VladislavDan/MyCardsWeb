import React, {FC, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {ICard} from '../../../types/ICard';
import "./CardsRepeaterComponent.css"
import {Button, CardActions} from '@material-ui/core';

export const CardsRepeaterComponent: FC<ICardsRepeaterComponent> = ({card}) => {

    const [state, setState] = useState<boolean>(false);

    return <div className="cards-repeater">{!state ? <Card>
        <CardContent onClick={() => setState(!state)}>
            <Typography gutterBottom variant="h5" component="h2">
                Question
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                {card.question}
            </Typography>
        </CardContent>
    </Card> : <Card className="cards-repeater">
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2" onClick={() => setState(!state)}>
                Answer
            </Typography>
            <Typography color="textSecondary" gutterBottom onClick={() => setState(!state)}>
                {card.answer}
            </Typography>
            <CardActions className="cards-repeater_buttons-container">
                <Button size="small" color="primary">
                    No
                </Button>
                <Button size="small" color="primary">
                    Yes
                </Button>
            </CardActions>
        </CardContent>
    </Card>}</div>
};

interface ICardsRepeaterComponent {
    card: ICard
}
