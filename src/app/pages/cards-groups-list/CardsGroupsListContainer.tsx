import React, {useState} from "react";

import {CardsGroupsListComponent} from './cards-groups-list-component/CardsGroupsListComponent';
import {useObservable} from '../../common/hooks/useObservable';
import {cardsGroupsListManager} from './CardsGroupsListService';
import {CardsGroup} from '../../types/CardsGroup';
import {useConstructor} from '../../common/hooks/useConstructor';
import {string} from 'prop-types';

export const CardsGroupsListContainer = () => {

    const [state, setState] = useState<CardsGroupsListContainerState>({cardsGroups: []});

    useObservable<string, CardsGroup[]>(cardsGroupsListManager.groupsListChannel, (cardsGroups: CardsGroup[]) => {
        setState({cardsGroups: cardsGroups})
    });

    useConstructor(() => {
        cardsGroupsListManager.groupsListChannel.next('');
    });

    return <CardsGroupsListComponent cardsGroups={state.cardsGroups}/>
};

interface CardsGroupsListContainerState {
    cardsGroups: CardsGroup[];
}
