import React, {FC, useState} from "react";

import {CardsGroupsListComponent} from './cards-groups-list-component/CardsGroupsListComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {ICardsGroup} from '../../types/ICardsGroup';
import {useConstructor} from '../../common/hooks/useConstructor';
import {CardsGroupsListService} from './CardsGroupsListService';

export const CardsGroupsListContainer: FC<ICardsGroupsListContainer> = ({cardsGroupsListService}) => {

    const [state, setState] = useState<CardsGroupsListContainerState>({cardsGroups: []});

    useChannel<string, ICardsGroup[]>(cardsGroupsListService.groupsListChannel, (cardsGroups: ICardsGroup[]) => {
        setState({cardsGroups: cardsGroups})
    });

    useConstructor(() => {
        cardsGroupsListService.groupsListChannel.next('');
    });

    return <CardsGroupsListComponent cardsGroups={state.cardsGroups}/>
};

interface CardsGroupsListContainerState {
    cardsGroups: ICardsGroup[];
}

interface ICardsGroupsListContainer {
    cardsGroupsListService: CardsGroupsListService
}
