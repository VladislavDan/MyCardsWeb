import React, {FC, useState} from 'react';

import {ICard} from '../../types/ICard';
import {CardsListComponent} from './CardsListComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {CardsListService} from './CardsListService';
import {useHistory, useLocation} from 'react-router';
import {useConstructor} from '../../common/hooks/useConstructor';
import {INavigationState} from '../../types/INavigationState';
import {Routs} from '../../common/Routs';
import {ICardsGroup} from '../../types/ICardsGroup';
import {ConfirmDialogService} from '../../parts/confirm-dialog/ConfirmDialogService';
import {useUnsubscribe} from '../../common/hooks/useUnsubscribe';

export const CardsListContainer: FC<ICardsListContainer> = ({cardsListService, confirmDialogService}) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const [state, setState] = useState<CardsListContainerState>({cards: []});

    useChannel(cardsListService.cardsChannel, (cards: ICard[]) => {
        setState({
            cards: cards
        });
    });

    useChannel(cardsListService.resetCardProgressChannel, (cards: ICardsGroup[]) => {
        cardsListService.cardsChannel.next(location.state.cardsGroupID)
    });

    useChannel(cardsListService.deleteCardChannel, (cards: ICardsGroup[]) => {
        cardsListService.cardsChannel.next(location.state.cardsGroupID)
    });

    useConstructor(() => {
        cardsListService.cardsChannel.next(location.state.cardsGroupID)
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

    const { setSubscription } = useUnsubscribe();

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
        cardsListService.resetCardProgressChannel.next({cardID, cardsGroupID: location.state.cardsGroupID})
    };

    const onClickItem = (cardID: number) => {
        history.push({
            pathname: Routs.cardsRepeater.path,
            state: {
                cardsGroupID: location.state.cardsGroupID,
                cardID: cardID
            }
        })
    };

    return <CardsListComponent
        cards={state.cards}
        onOpenEditor={onOpenEditor}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        onResetProgress={onResetProgress}
        onClickItem={onClickItem}
    />
};

interface CardsListContainerState {
    cards: ICard[];
}

interface ICardsListContainer {
    cardsListService: CardsListService;
    confirmDialogService: ConfirmDialogService;
}
