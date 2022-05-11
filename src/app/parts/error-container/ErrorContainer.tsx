import React, {FC, useState} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ErrorComponent} from './ErrorComponent';
import {ErrorService} from './ErrorService';

export const ErrorContainer: FC<IErrorContainer> = ({errorService}) => {

    const [state, setState] = useState<ErrorContainerState>({isOpen: false, errorMessage: ''});

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

interface IErrorContainer {
    errorService: ErrorService;
}

interface ErrorContainerState {
    isOpen: boolean;
    errorMessage: string;
}
