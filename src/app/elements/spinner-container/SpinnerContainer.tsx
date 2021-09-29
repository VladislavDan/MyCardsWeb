import {useState} from 'react';
import * as React from 'react';

import {SpinnerComponent} from './spinner-component/SpinnerComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {spinnerManager} from '../../../App';

export const SpinnerContainer = () => {

    const [isShow, setShowing] = useState(false);

    useChannel<number, number>(spinnerManager.spinnerCounterChannel, (spinnerCounter) => {
        setShowing(spinnerCounter !== 0);
    });

    return <SpinnerComponent isShow={isShow}/>
};
