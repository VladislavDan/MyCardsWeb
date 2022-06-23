import React, {FC} from 'react';
import {Button, CardActions} from '@mui/material';

import {IDeleteButtonFooterComponent} from "./types/IDeleteButtonFooterComponent";

export const DeleteButtonFooterComponent: FC<IDeleteButtonFooterComponent> = ({onClick}) => {

    return <>
        {
            <CardActions className="cards-repeater_buttons-container" style={{height: 10}}>
                <Button size="small" color="primary" onClick={() => onClick()}>
                    Remove
                </Button>
            </CardActions>
        }
    </>
};
