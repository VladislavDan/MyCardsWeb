import React, {useState} from 'react';

import {useSubscribe} from '../../common/hooks/useSubscribe';
import {errorManager} from './ErrorManager';
import {ErrorComponent} from './elements/error-component/ErrorComponent';

export const ErrorContainer = () => {

    const [state, setState] = useState<IErrorContainerState>({isOpen: false, errorMessage: ''});

    useSubscribe<string>(errorManager.errorChannel, (errorMessage: string) => {
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
