import * as React from 'react';
import {FC} from 'react';

import {ConfirmDialogComponent} from './ConfirmDialogComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {IConfirmDialogContainer} from "./types/IConfirmDialogContainer";
import {ConfirmDialogContainerState} from "./types/ConfirmDialogContainerState";
import {defaultConfirmDialogState} from "../../common/Constants";

export const ConfirmDialogContainer: FC<IConfirmDialogContainer> = ({confirmDialogService}) => {

    const [state, setState] = React.useState<ConfirmDialogContainerState>(defaultConfirmDialogState);

    useChannel<ConfirmDialogContainerState, ConfirmDialogContainerState>(
        confirmDialogService.openDialogChannel,
        (state: ConfirmDialogContainerState) => {
            console.log(state)
            setState(() => {
                return {...state}
            })
        }
    );

    const onClose = () => {
        setState((prevState) => {
            return {
                ...prevState,
                isOpen: false, message: ''
            }
        });
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
        titleBackgroundColor={state.titleBackgroundColor}
        icon={state.icon}
    />
};
