import React, {FC, useContext, useState} from "react";

import {CardsGroupsListComponent} from './CardsGroupsListComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {ICardsGroup} from '../../types/ICardsGroup';
import {useConstructor} from '../../common/hooks/useConstructor';
import {CardsGroupsListService} from './CardsGroupsListService';
import {Routs} from '../../common/Routs';
import {useHistory} from 'react-router';
import {ConfirmDialogService} from '../../parts/confirm-dialog/ConfirmDialogService';
import {useUnsubscribe} from '../../common/hooks/useUnsubscribe';
import {IAppContext} from '../../types/IAppContext';
import {AppContext} from '../../../App';

export const CardsGroupsListContainer: FC<ICardsGroupsListContainer> = ({cardsGroupsListService, confirmDialogService}) => {

    const [state, setState] = useState<CardsGroupsListContainerState>({cardsGroups: []});

    const history = useHistory();

    const context = useContext<IAppContext>(AppContext);

    useChannel<string, ICardsGroup[]>(cardsGroupsListService.groupsListChannel, (cardsGroups: ICardsGroup[]) => {
        setState({cardsGroups: cardsGroups})
    });

    useChannel<number, ICardsGroup[]>(cardsGroupsListService.groupDeleteChannel, () => {
        cardsGroupsListService.groupsListChannel.next('');
    });

    useChannel<number, ICardsGroup[]>(cardsGroupsListService.resetProgressChannel, () => {
        cardsGroupsListService.groupsListChannel.next('');
    });

    useConstructor(() => {
        cardsGroupsListService.groupsListChannel.next('');
    });

    const { setSubscription } = useUnsubscribe();

    const onClickItem = (cardsGroupID: number): void => {
        history.push({
            pathname: Routs.cards.path,
            state: {
                cardsGroupID: cardsGroupID
            }
        })
    };

    const onOpenEditor = () => {
        history.push({
            pathname: Routs.cardsGroupEditor.path
        })
    };

    const onDeleteItem = (cardsGroupID: number) => {

        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                cardsGroupsListService.groupDeleteChannel.next(cardsGroupID);
            }

            confirmDialogService.openDialogChannel.next({
                isOpen: false,
                message: ''
            })
        });

        setSubscription(subscription);

        confirmDialogService.openDialogChannel.next({
            isOpen: true,
            message: 'Do you want to remove this group?'
        })
    };

    const onEditItem = (cardsGroupID: number) => {
        history.push({
            pathname: Routs.cardsGroupEditor.path,
            state: {
                cardsGroupID: cardsGroupID
            }
        })
    };

    const onResetProgress = (cardsGroupID: number) => {
        const subscription = confirmDialogService.confirmationChannel.subscribe((isConfirm) => {
            if (isConfirm) {
                cardsGroupsListService.resetProgressChannel.next(cardsGroupID);
            }

            confirmDialogService.openDialogChannel.next({
                isOpen: false,
                message: ''
            })
        });

        setSubscription(subscription);

        confirmDialogService.openDialogChannel.next({
            isOpen: true,
            message: 'Do you want to reset progress of this group?'
        });
    };

    return <CardsGroupsListComponent
        onClickItem={onClickItem}
        onOpenEditor={onOpenEditor}
        onDeleteItem={onDeleteItem}
        onEditItem={onEditItem}
        onResetProgress={onResetProgress}
        height={context.height}
        width={context.width}
        cardsGroups={state.cardsGroups}/>
};

interface CardsGroupsListContainerState {
    cardsGroups: ICardsGroup[];
}

interface ICardsGroupsListContainer {
    cardsGroupsListService: CardsGroupsListService;
    confirmDialogService: ConfirmDialogService;
}