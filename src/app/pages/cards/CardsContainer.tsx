import React, {FC, useCallback, useContext, useState} from 'react';

import {CardsComponent} from './CardsComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useHistory, useLocation} from 'react-router';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {INavigationState} from '../../common/types/INavigationState';
import {Routs} from '../../common/Routs';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {useUnsubscribe} from '../../../MyTools/react-hooks/useUnsubscribe';
import {IAppContext} from '../../common/types/IAppContext';
import {AppContext} from '../../../App';
import {ICardsContainer} from "./types/ICardsContainer";
import {CardsContainerState} from "./types/CardsContainerState";
import {onDeleteSelectedCards} from "./ui-callbacks/onDeleteSelectedCards";
import {onCopySelectedCards} from "./ui-callbacks/onCopySelectedCards";
import {onMovingSelectedCards} from "./ui-callbacks/onMovingSelectedCards";
import {onSelectItem} from "./ui-callbacks/onSelectItem";
import {onStartSelecting} from "./ui-callbacks/onStartSelecting";
import {onOpenRepeater} from "./ui-callbacks/onOpenRepeater";
import {onChangeSorting} from "./ui-callbacks/onChangeSorting";
import {CallbackFactory} from "../../../MyTools/react-utils/CallbackFactory";
import {onChangeSearchableText} from "./ui-callbacks/onChangeSearchableText";
import {onCardsChannel} from "./channels-callbacks/onCardsChannel";
import {onCardsIDsByGroupIDsChannel} from "./channels-callbacks/onCardsIDsByGroupIDsChannel";
import {onCardsIDsBySelectedItemsChannel} from "./channels-callbacks/onCardsIDsBySelectedItemsChannel";
import {initialState} from "./Constants";

export const CardsContainer: FC<ICardsContainer> = (services) => {

    const {cardsListService, confirmDialogService} = services;

    const location = useLocation<INavigationState>();

    const history = useHistory<INavigationState>();

    const {setSubscription} = useUnsubscribe();

    const [state, setState] = useState<CardsContainerState>(initialState);

    const context = useContext<IAppContext>(AppContext);

    const callbackSettings = {location, history, services, state, setState, context, setSubscription}

    const callbackFactory = CallbackFactory(callbackSettings)

    useChannel(cardsListService.cardsChannel, callbackFactory(onCardsChannel));
    useChannel(cardsListService.cardsIDsByGroupIDsChannel, callbackFactory(onCardsIDsByGroupIDsChannel))
    useChannel(cardsListService.cardsIDsBySelectedItemsChannel, callbackFactory(onCardsIDsBySelectedItemsChannel))

    useChannel(cardsListService.resetCardProgressChannel, (cards: ICardsGroup[]) => {
        cardsListService.cardsChannel.next(
            {
                cardsGroupID: location.state.cardsGroupID,
                filter: state.filter
            }
        )
    });

    useChannel(cardsListService.deleteSingleCardChannel, (cards: ICardsGroup[]) => {
        cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: state.filter
        })
    });

    useChannel(cardsListService.movingCardsChannel, () => {
        cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: state.filter
        })
    })

    useChannel(cardsListService.copyCardsChannel, () => {
        cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: state.filter
        })
    })

    useChannel(cardsListService.deleteCardsChannel, () => {
        cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: state.filter
        })
    })

    useChannel(cardsListService.existedGroupsIDsChannel, (existedGroupsIDs) => {
        setState((prevState) => {
            return {
                ...prevState,
                existedGroupsIDs
            }
        })
    })

    useConstructor(() => {
        cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: state.filter
        })
        cardsListService.existedGroupsIDsChannel.next('')
    });

    const onOpenEditor = () => {
        history.push({
            pathname: Routs.cardsEditor.path,
            state: {
                ...location.state,
                cardsGroupID: location.state.cardsGroupID
            }
        })
    };

    const onEditItem = (cardID: number) => {
        history.push({
            pathname: Routs.cardsEditor.path,
            state: {
                ...location.state,
                cardsGroupID: location.state.cardsGroupID,
                cardID: cardID
            }
        })
    };

    const onDeleteItem = (cardID: number) => {
        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                cardsListService.deleteSingleCardChannel.next(cardID);
            }

            confirmDialogService.openDialogChannel.next({
                isOpen: false,
                message: ''
            })
        });

        setSubscription(subscription);

        confirmDialogService.openDialogChannel.next({
            isOpen: true,
            message: 'Do you want to remove this card?'
        })
    };

    const onResetProgress = (cardID: number) => {
        cardsListService.resetCardProgressChannel.next(
            {
                cardID,
                cardsGroupID: location.state.cardsGroupID
            }
        )
    };

    const onClickItem = (cardID: number) => {
        history.push({
            pathname: Routs.cardViewer.path,
            state: {
                ...location.state,
                cardsGroupID: location.state.cardsGroupID,
                cardID: cardID
            }
        })
    };

    const changeSearchableText = useCallback(callbackFactory(onChangeSearchableText), [state.filter]);
    const changeSorting = useCallback(callbackFactory(onChangeSorting), [state.filter]);
    const openRepeater = useCallback(callbackFactory(onOpenRepeater), [state.isEnabledSelecting, state.selectedItems]);

    const startSelecting = callbackFactory(onStartSelecting);
    const multiSelectingDependencies = [state.isEnabledSelecting, state.selectedItems]
    const selectItem = useCallback(callbackFactory(onSelectItem), multiSelectingDependencies);
    const movingSelectedCards = useCallback(callbackFactory(onMovingSelectedCards), multiSelectingDependencies);
    const copySelectedCards = useCallback(callbackFactory(onCopySelectedCards), multiSelectingDependencies);
    const deleteSelectedCards = useCallback(callbackFactory(onDeleteSelectedCards), multiSelectingDependencies)

    return <CardsComponent
        filter={state.filter}
        onChangeSorting={changeSorting}
        onChangeSearchableText={changeSearchableText}
        cards={state.cards}
        onOpenEditor={onOpenEditor}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        onResetProgress={onResetProgress}
        onClickItem={onClickItem}
        width={context.width}
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
