import React, {FC, useState} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ErrorComponent} from './ErrorComponent';
import {IErrorContainer} from "./types/IErrorContainer";
import {ErrorContainerState} from "./types/ErrorContainerState";

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
