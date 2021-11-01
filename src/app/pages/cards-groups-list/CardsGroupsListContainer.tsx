import React, {FC, useState} from "react";

import {CardsGroupsListComponent} from './CardsGroupsListComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {ICardsGroup} from '../../types/ICardsGroup';
import {useConstructor} from '../../common/hooks/useConstructor';
import {CardsGroupsListService} from './CardsGroupsListService';
import {Routs} from '../../common/Routs';
import {useHistory} from 'react-router';

export const CardsGroupsListContainer: FC<ICardsGroupsListContainer> = ({cardsGroupsListService}) => {

    const [state, setState] = useState<CardsGroupsListContainerState>({cardsGroups: []});

    const history = useHistory();

    useChannel<string, ICardsGroup[]>(cardsGroupsListService.groupsListChannel, (cardsGroups: ICardsGroup[]) => {
        setState({cardsGroups: cardsGroups})
    });

    useConstructor(() => {
        cardsGroupsListService.groupsListChannel.next('');
    });

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

    };

    const onEditItem = (cardsGroupID: number) => {
        history.push({
            pathname: Routs.cardsGroupEditor.path,
            state: {
                cardsGroupID: cardsGroupID
            }
        })
    };

    return <CardsGroupsListComponent
        onClickItem={onClickItem}
        onOpenEditor={onOpenEditor}
        onDeleteItem={onDeleteItem}
        onEditItem={onEditItem}
        cardsGroups={state.cardsGroups}/>
};

interface CardsGroupsListContainerState {
    cardsGroups: ICardsGroup[];
}

interface ICardsGroupsListContainer {
    cardsGroupsListService: CardsGroupsListService
}
