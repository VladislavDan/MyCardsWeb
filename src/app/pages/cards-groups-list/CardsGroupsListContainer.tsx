import React, {FC, useCallback} from "react";

import {CardsGroupsListComponent} from './CardsGroupsListComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {IAppContext} from '../../common/types/IAppContext';
import {AppContext} from '../../../App';
import {ICardsGroupsListContainer} from "./types/ICardsGroupsListContainer";
import {CardsGroupsListContainerState} from "./types/CardsGroupsListContainerState";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {INavigationState} from "../../common/types/INavigationState";
import {initialState} from "./Constants";
import {onResetProgress} from "./ui-callbacks/onResetProgress";
import {onEditItem} from "./ui-callbacks/onEditItem";
import {onDeleteItem} from "./ui-callbacks/onDeleteItem";
import {onOpenEditor} from "./ui-callbacks/onOpenEditor";
import {onClickItem} from "./ui-callbacks/onClickItem";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onResetProgressChannel} from "./channels-callbacks/onResetProgressChannel";
import {onGroupDeleteChannel} from "./channels-callbacks/onGroupDeleteChannel";
import {onGroupsListChannel} from "./channels-callbacks/onGroupsListChannel";
import {onChangeSorting} from "./ui-callbacks/onChangeSorting";
import {onChangeFilterChannel} from "./channels-callbacks/onChangeFilterChannel";
import {onFilterChannel} from "./channels-callbacks/onFilterChannel";
import {onChangeSearchableText} from "./ui-callbacks/onChangeSearchableText";

export const CardsGroupsListContainer: FC<ICardsGroupsListContainer> = (
    services
) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<INavigationState, CardsGroupsListContainerState, ICardsGroupsListContainer, IAppContext>(
        initialState,
        services,
        AppContext
    );

    const {state, context, services: {cardsGroupsListService}} = callbackSettings

    useChannel(cardsGroupsListService.groupsListChannel, callbackFactory(onGroupsListChannel));
    useChannel(cardsGroupsListService.groupDeleteChannel, callbackFactory(onGroupDeleteChannel));
    useChannel(cardsGroupsListService.resetProgressChannel, callbackFactory(onResetProgressChannel));
    useChannel(cardsGroupsListService.changeFilterChannel, callbackFactory(onChangeFilterChannel));
    useChannel(cardsGroupsListService.filterChannel, callbackFactory(onFilterChannel))

    useConstructor(callbackFactory(onConstructor));

    const clickItem = useCallback(callbackFactory(onClickItem), []);
    const openEditor = useCallback(callbackFactory(onOpenEditor), []);
    const deleteItem = useCallback(callbackFactory(onDeleteItem), []);
    const editItem = useCallback(callbackFactory(onEditItem), []);
    const resetProgress = useCallback(callbackFactory(onResetProgress), []);
    const changeSorting = useCallback(callbackFactory(onChangeSorting), [state.filter]);
    const changeSearchableText = useCallback(callbackFactory(onChangeSearchableText), [state.filter]);

    return <CardsGroupsListComponent
        onClickItem={clickItem}
        onOpenEditor={openEditor}
        onDeleteItem={deleteItem}
        onEditItem={editItem}
        onResetProgress={resetProgress}
        onChangeSorting={changeSorting}
        filter={state.filter}
        onChangeSearchableText={changeSearchableText}
        height={context.height}
        cardsGroups={state.cardsGroups}/>
};
