import React, {FC} from 'react';

import {Button} from '@mui/material';
import {IRepeatingStatisticComponent} from "./types/IRepeatingStatisticComponent";

export const StatisticComponent: FC<IRepeatingStatisticComponent> = ({repeatingProgress}) => {

    return <div>
        <Button size="small">
            <span style={{color: "red"}}>To Do: {repeatingProgress.todo}</span>
        </Button>
        <Button size="small">
            <span style={{color: "orange"}}>In progress: {repeatingProgress.inProgress}</span>
        </Button>
        <Button size="small">
            <span style={{color: "green"}}>Completed: {repeatingProgress.done}</span>
        </Button>
    </div>
};
