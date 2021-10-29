import React, {useState} from 'react';

import {useChannel} from '../../common/hooks/useChannel';
import {ErrorComponent} from './error-component/ErrorComponent';
import {errorService} from '../../../App';

export const ErrorContainer = () => {

    const [state, setState] = useState<IErrorContainerState>({isOpen: false, errorMessage: ''});

    useChannel<string, string>(errorService.errorChannel, (errorMessage: string) => {
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
