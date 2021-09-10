import {useState} from 'react';
import * as React from 'react';

import {SpinnerComponent} from './spinner-component/SpinnerComponent';
import {useObservable} from '../../common/hooks/useObservable';
import {spinnerManager} from '../../../App';

export const SpinnerContainer = () => {

    const [isShow, setShowing] = useState(false);

    useObservable<number, number>(spinnerManager.spinnerCounterChannel, (spinnerCounter) => {
        setShowing(spinnerCounter !== 0);
    });

    return <SpinnerComponent isShow={isShow}/>
};
