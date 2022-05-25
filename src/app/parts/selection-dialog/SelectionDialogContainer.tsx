import * as React from 'react';
import {FC} from 'react';

import {SelectionDialogComponent} from './SelectionDialogComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ISelectionDialogContainer} from "./types/ISelectionDialogContainer";
import {SelectionDialogContainerState} from "./types/SelectionDialogContainerState";

export const SelectionDialogContainer: FC<ISelectionDialogContainer> = ({selectionDialogService}) => {

    const [state, setState] = React.useState<SelectionDialogContainerState>({
        isOpen: false,
        title: '',
        selectionItems: []
    });

    useChannel<SelectionDialogContainerState, SelectionDialogContainerState>(
        selectionDialogService.openDialogChannel,
        (state: SelectionDialogContainerState) => {
            setState({...state});
        }
    );

    const onClose = () => {
        setState({isOpen: false, title: '', selectionItems: []});
        selectionDialogService.selectionChannel.unsubscribe();
    };

    const onClickItem = (itemID: number) => {
        selectionDialogService.selectionChannel.next(itemID);
    };

    return <SelectionDialogComponent
        isOpen={state.isOpen}
        onClickItem={onClickItem}
        onClose={onClose}
        title={state.title}
        selectionItems={state.selectionItems}
    />
};
