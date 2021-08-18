import {LinearProgress} from '@material-ui/core';
import {FC} from 'react';
import * as React from 'react';

export const SpinnerComponent: FC<ISpinnerComponent> = ({isShow}) => {
    return (
        isShow ? <LinearProgress color="secondary" /> : null
    )
};

interface ISpinnerComponent {
   isShow: boolean;
}
