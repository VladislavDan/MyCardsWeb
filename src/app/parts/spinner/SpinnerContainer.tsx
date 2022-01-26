import * as React from 'react';
import {FC, useState} from 'react';

import {SpinnerComponent} from './SpinnerComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {SpinnerService} from './SpinnerService';

export const SpinnerContainer: FC<ISpinnerContainer> = ({spinnerService}) => {

    const [isShow, setShowing] = useState(false);

    useChannel<number, number>(spinnerService.spinnerCounterChannel, (spinnerCounter) => {
        setShowing(spinnerCounter !== 0);
    });

    return <SpinnerComponent isShow={isShow}/>
};

interface ISpinnerContainer {
    spinnerService: SpinnerService;
}
