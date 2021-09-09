import {useState} from 'react';
import * as React from 'react';

import {SpinnerComponent} from './spinner-component/SpinnerComponent';
import {useSubscribe} from '../../common/hooks/useSubscribe';
import {spinnerManager} from '../../../App';

export const SpinnerContainer = () => {

    const [isShow, setShowing] = useState(false);

    useSubscribe<number, number>(spinnerManager.spinnerCounterChannel, (spinnerCounter) => {
        setShowing(spinnerCounter !== 0);
    });

    return <SpinnerComponent isShow={isShow}/>
};
