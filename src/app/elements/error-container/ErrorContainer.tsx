import React, {useState} from 'react';

import {useSubscribe} from '../../common/hooks/useSubscribe';
import {ErrorComponent} from './error-component/ErrorComponent';
import {errorService} from '../../../App';

export const ErrorContainer = () => {

    const [state, setState] = useState<IErrorContainerState>({isOpen: false, errorMessage: ''});

    useSubscribe<string, string>(errorService.errorChannel, (errorMessage: string) => {
        setState({
            isOpen: true,
            errorMessage
        })
    });

    const onClose = () => {
        setState({
            isOpen: false,
            errorMessage: ''
        })
    };

    return <ErrorComponent isOpen={state.isOpen} errorMessage={state.errorMessage} handleClose={onClose}/>
};

interface IErrorContainerState {
    isOpen: boolean;
    errorMessage: string;
}
