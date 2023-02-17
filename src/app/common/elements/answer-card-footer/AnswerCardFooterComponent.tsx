import React, {FC} from 'react';
import {Button, CardActions} from '@mui/material';

import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';
import {IAnswerCardFooterComponent} from './types/IAnswerCardFooterComponent';
import './AnswerCardFooterComponent.css'

export const AnswerCardFooterComponent: FC<IAnswerCardFooterComponent> = ({card, onClickYesNoButton}) => {

    return <>
        {
            card && card.rangeOfKnowledge !== IRangeOfKnowledge.DONE ?
                <CardActions className="answer-card-footer">
                    <Button
                        className="answer-card-footer_action answer-card-footer_action-button-yes"
                        size="small"
                        color="primary"
                        onClick={() => onClickYesNoButton(true)}>
                        Yes
                    </Button>
                    <Button
                        className="answer-card-footer_action answer-card-footer_action-button-no"
                        size="small" color="primary"
                        onClick={() => onClickYesNoButton(false)}>
                        No
                    </Button>
                </CardActions> :
                <div>Repeated</div>
        }
    </>
};
