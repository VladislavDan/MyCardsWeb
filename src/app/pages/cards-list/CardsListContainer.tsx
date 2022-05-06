import React, {FC, useContext, useState} from 'react';

import {ICard} from '../../types/ICard';
import {CardsListComponent} from './CardsListComponent';
import {useChannel} from '../../../../MyTools/channel-conception/react-hooks/useChannel';
import {CardsListService} from './CardsListService';
import {useHistory, useLocation} from 'react-router';
import {useConstructor} from '../../../../MyTools/react-hooks/useConstructor';
import {INavigationState} from '../../types/INavigationState';
import {Routs} from '../../common/Routs';
import {ICardsGroup} from '../../types/ICardsGroup';
import {ConfirmDialogService} from '../../parts/confirm-dialog/ConfirmDialogService';
import {useUnsubscribe} from '../../../../MyTools/react-hooks/useUnsubscribe';
import {IAppContext} from '../../types/IAppContext';
import {AppContext} from '../../../App';
import {IFilter} from "../../types/IFilter";
import {ISortVariants} from "../../types/ISortVariants";

export const CardsListContainer: FC<ICardsListContainer> = ({cardsListService, confirmDialogService}) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const [state, setState] = useState<CardsListContainerState>(
        {
            cards: [],
            filter: {
                searchableText: '',
                sort: ISortVariants.NONE,
            },
            isEnabledSelecting: false
        }
    );

    const context = useContext<IAppContext>(AppContext);

    useChannel(cardsListService.cardsChannel, (cards: ICard[]) => {
        setState((prevState) => {
            return {
                ...prevState,
                cards
            }
        });
    });

    useChannel(cardsListService.resetCardProgressChannel, (cards: ICardsGroup[]) => {
        cardsListService.cardsChannel.next(
            {
                cardsGroupID: location.state.cardsGroupID,
                filter: state.filter
            }
        )
    });

    useChannel(cardsListService.deleteCardChannel, (cards: ICardsGroup[]) => {
        cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: state.filter
        })
    });

    useConstructor(() => {
        cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: state.filter
        })
    });

    const onOpenEditor = () => {
        history.push({
            pathname: Routs.cardsEditor.path,
            state: {
                cardsGroupID: location.state.cardsGroupID
            }
        })
    };

    const onEditItem = (cardID: number) => {
        history.push({
            pathname: Routs.cardsEditor.path,
            state: {
                cardsGroupID: location.state.cardsGroupID,
                cardID: cardID
            }
        })
    };

    const {setSubscription} = useUnsubscribe();

    const onDeleteItem = (cardID: number) => {
        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                cardsListService.deleteCardChannel.next({cardID, cardsGroupID: location.state.cardsGroupID});
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
                cardsGroupID: location.state.cardsGroupID,
                cardID: cardID
            }
        })
    };

    const onChangeSearchableText = (searchableText: string) => {

        const newFilter = {
            ...state.filter,
            searchableText: searchableText
        }

        setState({
            ...state,
            filter: newFilter
        })

        cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: newFilter
        })
    };

    const onChangeSorting = (sortVariant: ISortVariants) => {

        const newFilter = {
            ...state.filter,
            sort: sortVariant
        }

        setState({
            ...state,
            filter: newFilter
        })

        cardsListService.cardsChannel.next({
            cardsGroupID: location.state.cardsGroupID,
            filter: newFilter
        })
    };

    const onOpenRepeater = () => {
        history.push({
            pathname: Routs.cardsRepeater.path,
            state: location.state
        })
    };

    const onStartSelecting = () => {
        setState({
            ...state,
            isEnabledSelecting: !state.isEnabledSelecting
        })
    }

    return <CardsListComponent
        filter={state.filter}
        onChangeSorting={onChangeSorting}
        onChangeSearchableText={onChangeSearchableText}
        cards={state.cards}
        onOpenEditor={onOpenEditor}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        onResetProgress={onResetProgress}
        onClickItem={onClickItem}
        width={context.width}
        height={context.height}
        onOpenRepeater={onOpenRepeater}
        onStartSelecting={onStartSelecting}
        isEnabledSelecting={state.isEnabledSelecting}
    />
};

interface CardsListContainerState {
    cards: ICard[];
    filter: IFilter;
    isEnabledSelecting: boolean;
}

interface ICardsListContainer {
    cardsListService: CardsListService;
    confirmDialogService: ConfirmDialogService;
}
