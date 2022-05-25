import React, {FC, useContext, useState} from 'react';

import {ICard} from '../../common/types/ICard';
import {CardsListComponent} from './CardsListComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useHistory, useLocation} from 'react-router';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {INavigationState} from '../../common/types/INavigationState';
import {Routs} from '../../common/Routs';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {useUnsubscribe} from '../../../MyTools/react-hooks/useUnsubscribe';
import {IAppContext} from '../../common/types/IAppContext';
import {AppContext} from '../../../App';
import {ISortVariants} from "../../common/types/ISortVariants";
import {ICardsListContainer} from "./types/ICardsListContainer";
import {CardsListContainerState} from "./types/CardsListContainerState";

export const CardsListContainer: FC<ICardsListContainer> = (
    {
        cardsListService,
        confirmDialogService,
        selectionDialogService
    }
) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const [state, setState] = useState<CardsListContainerState>(
        {
            cards: [],
            filter: {
                searchableText: '',
                sort: ISortVariants.NONE,
            },
            isEnabledSelecting: false,
            selectedItems: {},
            existedGroupsIDs: []
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

    useChannel(cardsListService.movingCardsChannel, () => {
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
            isEnabledSelecting: !state.isEnabledSelecting,
            selectedItems: !state.isEnabledSelecting ? {} : state.selectedItems
        })
    }

    const onSelectItem = (cardID: number) => {
        const selectedItems = {
            ...state.selectedItems
        };

        if (selectedItems[cardID]) {
            selectedItems[cardID] = !selectedItems[cardID]
        } else {
            selectedItems[cardID] = true
        }

        setState({
            ...state,
            selectedItems
        })
    }

    const onMovingSelectedCards = () => {
        const subscription = selectionDialogService.selectionChannel.subscribe((groupID) => {

            const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
                if (isConfirm) {
                    cardsListService.movingCardsChannel.next({
                        selectedItems: state.selectedItems,
                        destinationGroupID: groupID
                    });

                    selectionDialogService.openDialogChannel.next({
                        isOpen: false,
                        title: '',
                        selectionItems: []
                    });
                }

                confirmDialogService.openDialogChannel.next({
                    isOpen: false,
                    message: ''
                })
            });

            setSubscription(subscription);

            confirmDialogService.openDialogChannel.next({
                isOpen: true,
                message: 'Do you want to move this cards?'
            });
        });

        setSubscription(subscription);

        selectionDialogService.openDialogChannel.next({
            isOpen: true,
            title: 'Select cards group',
            selectionItems: state.existedGroupsIDs
        })
    }

    const onDeleteSelectedCards = () => {

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
        onSelectItem={onSelectItem}
        selectedItems={state.selectedItems}
        onMovingSelectedCards={onMovingSelectedCards}
        onDeleteSelectedCards={onDeleteSelectedCards}
    />
};
