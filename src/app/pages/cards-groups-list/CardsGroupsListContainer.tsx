import React, {useState} from "react";

import {CardsGroupsListComponent} from './cards-groups-list-component/CardsGroupsListComponent';
import {useChannel} from '../../common/hooks/useChannel';
import {cardsGroupsListManager} from './CardsGroupsListService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {useConstructor} from '../../common/hooks/useConstructor';
import {string} from 'prop-types';

export const CardsGroupsListContainer = () => {

    const [state, setState] = useState<CardsGroupsListContainerState>({cardsGroups: []});

    useChannel<string, ICardsGroup[]>(cardsGroupsListManager.groupsListChannel, (cardsGroups: ICardsGroup[]) => {
        setState({cardsGroups: cardsGroups})
    });

    useConstructor(() => {
        cardsGroupsListManager.groupsListChannel.next('');
    });

    return <CardsGroupsListComponent cardsGroups={state.cardsGroups}/>
};

interface CardsGroupsListContainerState {
    cardsGroups: ICardsGroup[];
}
