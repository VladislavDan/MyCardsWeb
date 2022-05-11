import * as React from 'react';
import {FC} from 'react';

import {ConfirmDialogComponent} from './ConfirmDialogComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ConfirmDialogService} from './ConfirmDialogService';

export const ConfirmDialogContainer: FC<IConfirmDialogContainer> = ({confirmDialogService}) => {

    const [state, setState] = React.useState<ConfirmDialogContainerState>({
        isOpen: false,
        message: ''
    });

    useChannel<ConfirmDialogContainerState, ConfirmDialogContainerState>(
        confirmDialogService.openDialogChannel,
        (state: ConfirmDialogContainerState) => {
            setState({...state});
        }
    );

    const onClose = () => {
        setState({isOpen: false, message: ''});
        confirmDialogService.confirmationChannel.unsubscribe();
    };

    const onClickAgree = () => {
        confirmDialogService.confirmationChannel.next(true);
    };

    const onClickDisagree = () => {
        confirmDialogService.confirmationChannel.next(false);
    };

    return <ConfirmDialogComponent
        isOpen={state.isOpen}
        onClickAgree={onClickAgree}
        onClickDisagree={onClickDisagree}
        onClose={onClose}
        message={state.message}
    />
};

export interface IConfirmDialogContainer {
    confirmDialogService: ConfirmDialogService;
}

export interface ConfirmDialogContainerState {
    isOpen: boolean;
    message: string;
}
