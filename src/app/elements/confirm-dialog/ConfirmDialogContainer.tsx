import * as React from 'react';

import {ConfirmDialogComponent} from './confirm-dialog-component/ConfirmDialogComponent';
import {useSubscribe} from '../../common/hooks/useSubscribe';
import {confirmDialogService} from './ConfirmDialogService';

export const ConfirmDialogContainer = () => {

    const [state, setState] = React.useState<ConfirmDialogContainerState>({
        isOpen: false,
        message: ''
    });

    useSubscribe<ConfirmDialogContainerState, ConfirmDialogContainerState>(
        confirmDialogService.openDialogChannel,
        (state: ConfirmDialogContainerState) => {
            setState({...state});
        }
    );

    const onClose = () => {
        setState({isOpen: false, message: ''})
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

export interface ConfirmDialogContainerState {
    isOpen: boolean;
    message: string;
}
