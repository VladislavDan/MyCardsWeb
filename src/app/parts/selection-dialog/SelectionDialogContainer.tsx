import * as React from 'react';
import {FC, useCallback} from 'react';

import {SelectionDialogComponent} from './SelectionDialogComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {AppContext} from '../../../App';
import {initialState} from './defaults/initialState';
import {SelectionDialogCallbackSettings} from './types/SelectionDialogCallbackSettings';
import {onOpenDialogChannel} from './channels-callbacks/onOpenDialogChannel';
import {onClose} from './ui-callbacks/onClose';
import {onClickItem} from './ui-callbacks/onClickItem';
import {useDependencyContext} from '../../../MyTools/react-di/hooks/useDependency';
import {SelectionDialogService} from './SelectionDialogService';
import {IDependenciesNames} from '../../common/types/IDependenciesNames';

export const SelectionDialogContainer: FC = () => {

    const selectionDialogService = useDependencyContext<SelectionDialogService>(IDependenciesNames.SelectionDialogService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<SelectionDialogCallbackSettings>(
        initialState,
        {selectionDialogService},
        AppContext
    );

    const {state} = externalCallbackSettings

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
