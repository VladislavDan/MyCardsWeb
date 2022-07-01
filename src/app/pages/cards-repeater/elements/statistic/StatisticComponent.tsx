import React, {FC} from 'react';

import {Button} from '@mui/material';
import {IRepeatingStatisticComponent} from "./types/IRepeatingStatisticComponent";

export const StatisticComponent: FC<IRepeatingStatisticComponent> = ({statistic}) => {

    return <div>
        <Button size="small">
            <span style={{color: "red"}}>To Do: {statistic.todo}</span>
        </Button>
        <Button size="small">
            <span style={{color: "orange"}}>In progress: {statistic.inProgress}</span>
        </Button>
        <Button size="small">
            <span style={{color: "green"}}>Completed: {statistic.done}</span>
        </Button>
    </div>
};
