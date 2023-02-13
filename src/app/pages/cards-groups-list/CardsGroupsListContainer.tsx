import React, {FC, useCallback} from 'react';

import {CardsGroupsListComponent} from './CardsGroupsListComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {AppContext} from '../../../App';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {onResetProgress} from './ui-callbacks/onResetProgress';
import {onEditItem} from './ui-callbacks/onEditItem';
import {onDeleteItem} from './ui-callbacks/onDeleteItem';
import {onOpenEditor} from './ui-callbacks/onOpenEditor';
import {onClickItem} from './ui-callbacks/onClickItem';
import {onConstructor} from './ui-callbacks/onConstructor';
import {onResetProgressChannel} from './channels-callbacks/onResetProgressChannel';
import {onGroupDeleteChannel} from './channels-callbacks/onGroupDeleteChannel';
import {onGroupsListChannel} from './channels-callbacks/onGroupsListChannel';
import {onChangeSorting} from './ui-callbacks/onChangeSorting';
import {onChangeFilterChannel} from './channels-callbacks/onChangeFilterChannel';
import {onFilterChannel} from './channels-callbacks/onFilterChannel';
import {onChangeSearchableText} from './ui-callbacks/onChangeSearchableText';
import {initialState} from './defaults/initialState';
import {ICardsGroupsCallbackSettings} from './types/ICardsGroupsCallbackSettings';
import {useDependency} from '../../../MyTools/react-di/hooks/useDependency';
import {CardsGroupsListService} from './CardsGroupsListService';
import {ConfirmDialogService} from '../../parts/confirm-dialog/ConfirmDialogService';
import {onStartRepeatingDifficultCards} from './ui-callbacks/onStartRepeatingDifficultCards';
import {onStartRepeatingDifficultCardsChannel} from './channels-callbacks/onStartRepeatingDifficultCardsChannel';

export const CardsGroupsListContainer: FC = () => {

    const cardsGroupsListService = useDependency(CardsGroupsListService);
    const confirmDialogService = useDependency(ConfirmDialogService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<ICardsGroupsCallbackSettings>(
        initialState,
        {cardsGroupsListService, confirmDialogService},
        AppContext
    );

    const {state, context} = externalCallbackSettings;

    useChannel(cardsGroupsListService.groupsListChannel, callbackFactory(onGroupsListChannel));
    useChannel(cardsGroupsListService.groupDeleteChannel, callbackFactory(onGroupDeleteChannel));
    useChannel(cardsGroupsListService.resetProgressChannel, callbackFactory(onResetProgressChannel));
    useChannel(cardsGroupsListService.changeFilterChannel, callbackFactory(onChangeFilterChannel));
    useChannel(cardsGroupsListService.filterChannel, callbackFactory(onFilterChannel))
    useChannel(cardsGroupsListService.startRepeatingDifficultCardsChannel, callbackFactory(onStartRepeatingDifficultCardsChannel))

    useConstructor(callbackFactory(onConstructor));

    const clickItem = useCallback(callbackFactory(onClickItem), []);
    const openEditor = useCallback(callbackFactory(onOpenEditor), []);
    const deleteItem = useCallback(callbackFactory(onDeleteItem), []);
    const editItem = useCallback(callbackFactory(onEditItem), []);
    const resetProgress = useCallback(callbackFactory(onResetProgress), []);
    const changeSorting = useCallback(callbackFactory(onChangeSorting), []);
    const changeSearchableText = useCallback(callbackFactory(onChangeSearchableText), []);
    const startRepeatingDifficultCards = useCallback(callbackFactory(onStartRepeatingDifficultCards), [])

    return <CardsGroupsListComponent
        onClickItem={clickItem}
        onOpenEditor={openEditor}
        onDeleteItem={deleteItem}
        onEditItem={editItem}
        onResetProgress={resetProgress}
        onChangeSorting={changeSorting}
        filter={state.filter}
        onChangeSearchableText={changeSearchableText}
        onStartRepeatingDifficultCards={startRepeatingDifficultCards}
        height={context.height}
        cardsGroups={state.cardsGroups}/>
};
