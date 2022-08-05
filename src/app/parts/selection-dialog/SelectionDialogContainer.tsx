import * as React from 'react';
import {FC, useCallback} from 'react';

import {SelectionDialogComponent} from './SelectionDialogComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ISelectionDialogContainer} from "./types/ISelectionDialogContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {initialState} from "./defaults/initialState";
import {SelectionDialogCallbackSettings} from "./types/SelectionDialogCallbackSettings";
import {onOpenDialogChannel} from "./channels-callbacks/onOpenDialogChannel";
import {onClose} from "./ui-callbacks/onClose";
import {onClickItem} from "./ui-callbacks/onClickItem";

export const SelectionDialogContainer: FC<ISelectionDialogContainer> = (services) => {
    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<SelectionDialogCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {state, services: {selectionDialogService}} = callbackSettings

    useChannel(selectionDialogService.openDialogChannel, callbackFactory(onOpenDialogChannel));

    const close = useCallback(callbackFactory(onClose), [])
    const clickItem = useCallback(callbackFactory(onClickItem), [])

    return <SelectionDialogComponent
        isOpen={state.isOpen}
        onClickItem={clickItem}
        onClose={close}
        title={state.title}
        selectionItems={state.selectionItems}
    />
};
