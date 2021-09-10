import React, {FC} from 'react';

import {ICard} from '../../../../types/ICard';
import {Button} from '@material-ui/core';

export const RepeatingStatisticComponent: FC<IRepeatingStatisticComponent> = () => {

    return <div>
        <Button size="small">
            <span style={{color: "green"}}>Completed: 5</span>
        </Button>
        <Button size="small">
            <span style={{color: "orange"}}>In progress: 6</span>
        </Button>
        <Button size="small">
            <span style={{color: "red"}}>To Do: 7</span>
        </Button>
    </div>
};

interface IRepeatingStatisticComponent {
    card: ICard
    onClick: (isUnderstandable: boolean) => void
    isQuestionSide: boolean,
    onClickCard: () => void
}
