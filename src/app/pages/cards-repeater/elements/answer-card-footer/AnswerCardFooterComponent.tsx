import React, {FC} from 'react';
import {Button, CardActions} from '@mui/material';

import {IRangeOfKnowledge} from '../../../../types/IRangeOfKnowledge';
import {ICard} from '../../../../types/ICard';

export const AnswerCardFooterComponent: FC<IAnswerCardFooterComponent> = ({card, onClick}) => {

    return <>
        {
            card && card.rangeOfKnowledge !== IRangeOfKnowledge.DONE ?
                <CardActions className="cards-repeater_buttons-container" style={{height: 10}}>
                    <Button size="small" color="primary" onClick={() => onClick(true)}>
                        Yes
                    </Button>
                    <Button size="small" color="primary" onClick={() => onClick(false)}>
                        No
                    </Button>
                </CardActions> :
                <div>Repeated</div>
        }
    </>
};

interface IAnswerCardFooterComponent {
    onClick: (isUnderstandable: boolean) => void;
    card: ICard | undefined;
}
