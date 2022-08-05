import React, {FC, useCallback} from 'react';

import {CardsComponent} from './CardsComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {AppContext} from '../../../App';
import {ICardsContainer} from "./types/ICardsContainer";
import {onDeleteSelectedCards} from "./ui-callbacks/onDeleteSelectedCards";
import {onCopySelectedCards} from "./ui-callbacks/onCopySelectedCards";
import {onMovingSelectedCards} from "./ui-callbacks/onMovingSelectedCards";
import {onSelectItem} from "./ui-callbacks/onSelectItem";
import {onStartSelecting} from "./ui-callbacks/onStartSelecting";
import {onOpenRepeater} from "./ui-callbacks/onOpenRepeater";
import {onChangeSorting} from "./ui-callbacks/onChangeSorting";
import {onChangeSearchableText} from "./ui-callbacks/onChangeSearchableText";
import {onCardsChannel} from "./channels-callbacks/onCardsChannel";
import {onCardsIDsByGroupIDsChannel} from "./channels-callbacks/onCardsIDsByGroupIDsChannel";
import {onCardsIDsBySelectedItemsChannel} from "./channels-callbacks/onCardsIDsBySelectedItemsChannel";
import {onFilterChannel} from "./channels-callbacks/onFilterChannel";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onChangeFilter} from "./channels-callbacks/onChangeFilter";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {onResetCardProgressChannel} from "./channels-callbacks/onResetCardProgressChannel";
import {onDeleteSingleCardChannel} from "./channels-callbacks/onDeleteSingleCardChannel";
import {onMovingCardsChannel} from "./channels-callbacks/onMovingCardsChannel";
import {onCopyCardsChannel} from "./channels-callbacks/onCopyCardsChannel";
import {onDeleteCardsChannel} from "./channels-callbacks/onDeleteCardsChannel";
import {onExistedGroupsIDsChannel} from "./channels-callbacks/onExistedGroupsIDsChannel";
import {onOpenEditor} from "./ui-callbacks/onOpenEditor";
import {onEditItem} from "./ui-callbacks/onEditItem";
import {onDeleteItem} from "./ui-callbacks/onDeleteItem";
import {onResetProgress} from "./ui-callbacks/onResetProgress";
import {onClickItem} from "./ui-callbacks/onClickItem";
import {initialState} from "./defaults/initialState";
import {CardsCallbackSettings} from "./types/CardsCallbackSettings";

export const CardsContainer: FC<ICardsContainer> = (services) => {
    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<CardsCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {state, context, services: {cardsListService}} = callbackSettings

    useChannel(cardsListService.cardsChannel, callbackFactory(onCardsChannel));
    useChannel(cardsListService.cardsIDsByGroupIDsChannel, callbackFactory(onCardsIDsByGroupIDsChannel));
    useChannel(cardsListService.cardsIDsBySelectedItemsChannel, callbackFactory(onCardsIDsBySelectedItemsChannel));
    useChannel(cardsListService.filterChannel, callbackFactory(onFilterChannel));
    useChannel(cardsListService.changeFilterChannel, callbackFactory(onChangeFilter))
    useChannel(cardsListService.resetCardProgressChannel, callbackFactory(onResetCardProgressChannel));
    useChannel(cardsListService.deleteSingleCardChannel, callbackFactory(onDeleteSingleCardChannel));
    useChannel(cardsListService.movingCardsChannel, callbackFactory(onMovingCardsChannel));
    useChannel(cardsListService.copyCardsChannel, callbackFactory(onCopyCardsChannel));
    useChannel(cardsListService.deleteCardsChannel, callbackFactory(onDeleteCardsChannel))
    useChannel(cardsListService.existedGroupsIDsChannel, callbackFactory(onExistedGroupsIDsChannel))

    useConstructor(callbackFactory(onConstructor));

    const openEditor = useCallback(callbackFactory(onOpenEditor), []);
    const editItem = useCallback(callbackFactory(onEditItem), []);
    const deleteItem = useCallback(callbackFactory(onDeleteItem), []);
    const resetProgress = useCallback(callbackFactory(onResetProgress), []);
    const clickItem = useCallback(callbackFactory(onClickItem), []);
    const changeSearchableText = useCallback(callbackFactory(onChangeSearchableText), [state.filter]);
    const changeSorting = useCallback(callbackFactory(onChangeSorting), [state.filter]);

    const startSelecting = useCallback(callbackFactory(onStartSelecting), []);
    const openRepeater = useCallback(callbackFactory(onOpenRepeater), []);
    const selectItem = useCallback(callbackFactory(onSelectItem), []);
    const movingSelectedCards = useCallback(callbackFactory(onMovingSelectedCards), []);
    const copySelectedCards = useCallback(callbackFactory(onCopySelectedCards), []);
    const deleteSelectedCards = useCallback(callbackFactory(onDeleteSelectedCards), [])

    return <CardsComponent
        filter={state.filter}
        onChangeSorting={changeSorting}
        onChangeSearchableText={changeSearchableText}
        cards={state.cards}
        onOpenEditor={openEditor}
        onEditItem={editItem}
        onDeleteItem={deleteItem}
        onResetProgress={resetProgress}
        onClickItem={clickItem}
        height={context.height}
        onOpenRepeater={openRepeater}
        onStartSelecting={startSelecting}
        isEnabledSelecting={state.isEnabledSelecting}
        onSelectItem={selectItem}
        selectedItems={state.selectedItems}
        onMovingSelectedCards={movingSelectedCards}
        onDeleteSelectedCards={deleteSelectedCards}
        onCopySelectedCards={copySelectedCards}
    />
};
