import React, {FC} from 'react';

import {Button} from '@material-ui/core';
import {IStatistic} from '../../../../types/IStatistic';

export const RepeatingStatisticComponent: FC<IRepeatingStatisticComponent> = ({statistic}) => {

    return <div>
        <Button size="small">
            <span style={{color: "green"}}>Completed: {statistic.todo}</span>
        </Button>
        <Button size="small">
            <span style={{color: "orange"}}>In progress: {statistic.inProgress}</span>
        </Button>
        <Button size="small">
            <span style={{color: "red"}}>To Do: {statistic.done}</span>
        </Button>
    </div>
};

interface IRepeatingStatisticComponent {
    statistic: IStatistic
}
