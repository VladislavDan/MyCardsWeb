import React, {FC} from 'react';
import {Button, CardActions} from '@mui/material';

import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';
import {IAnswerCardFooterComponent} from "./types/IAnswerCardFooterComponent";

export const AnswerCardFooterComponent: FC<IAnswerCardFooterComponent> = ({card, onClickYesNoButton}) => {

    return <>
        {
            card && card.rangeOfKnowledge !== IRangeOfKnowledge.DONE ?
                <CardActions className="cards-repeater_buttons-container" style={{height: 10}}>
                    <Button size="small" color="primary" onClick={() => onClickYesNoButton(true)}>
                        Yes
                    </Button>
                    <Button size="small" color="primary" onClick={() => onClickYesNoButton(false)}>
                        No
                    </Button>
                </CardActions> :
                <div>Repeated</div>
        }
    </>
};
