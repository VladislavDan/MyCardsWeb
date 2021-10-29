import * as React from 'react';
import {useState} from 'react';

import {SpinnerComponent} from './spinner-component/SpinnerComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {spinnerService} from '../../../App';

export const SpinnerContainer = () => {

    const [isShow, setShowing] = useState(false);

    useChannel<number, number>(spinnerService.spinnerCounterChannel, (spinnerCounter) => {
        setShowing(spinnerCounter !== 0);
    });

    return <SpinnerComponent isShow={isShow}/>
};
