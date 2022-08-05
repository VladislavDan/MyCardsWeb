import * as React from 'react';
import {FC, useCallback} from 'react';

import {ConfirmDialogComponent} from './ConfirmDialogComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {IConfirmDialogContainer} from "./types/IConfirmDialogContainer";
import {defaultConfirmDialogState} from "../../common/defaults/defaultConfirmDialogState";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {onOpenDialogChannel} from "./channels-callbacks/onOpenDialogChannel";
import {onClose} from "./ui-callbacks/onClose";
import {onClickAgree} from "./ui-callbacks/onClickAgree";
import {onClickDisagree} from "./ui-callbacks/onClickDisagree";
import {ConfirmDialogCallbackSettings} from "./types/ConfirmDialogCallbackSettings";

export const ConfirmDialogContainer: FC<IConfirmDialogContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<ConfirmDialogCallbackSettings>(
        defaultConfirmDialogState,
        services,
        AppContext
    );

    const {state, services: {confirmDialogService}} = callbackSettings

    useChannel(confirmDialogService.openDialogChannel, callbackFactory(onOpenDialogChannel));

    const close = useCallback(callbackFactory(onClose), []);
    const clickAgree = useCallback(callbackFactory(onClickAgree), [])
    const clickDisagree = useCallback(callbackFactory(onClickDisagree), [])

    return <ConfirmDialogComponent
        isOpen={state.isOpen}
        onClickAgree={clickAgree}
        onClickDisagree={clickDisagree}
        onClose={close}
        message={state.message}
        titleBackgroundColor={state.titleBackgroundColor}
        icon={state.icon}
    />
};
