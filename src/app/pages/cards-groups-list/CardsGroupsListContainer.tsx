import React, {useState} from "react";

import {CardsGroupsListComponent} from './cards-groups-list-component/CardsGroupsListComponent';
import {useSubscribe} from '../../common/hooks/useSubscribe';
import {cardsGroupsListManager} from './CardsGroupsListService';
import {CardsGroup} from '../../types/CardsGroup';
import {useFirstRender} from '../../common/hooks/useFirstRender';
import {string} from 'prop-types';

export const CardsGroupsListContainer = () => {

    const [state, setState] = useState<CardsGroupsListContainerState>({cardsGroups: []});

    useSubscribe<string, CardsGroup[]>(cardsGroupsListManager.groupsListChannel, (cardsGroups: CardsGroup[]) => {
        setState({cardsGroups: cardsGroups})
    });

    useFirstRender(() => {
        cardsGroupsListManager.groupsListChannel.next('');
    });

    return <CardsGroupsListComponent cardsGroups={state.cardsGroups}/>
};

interface CardsGroupsListContainerState {
    cardsGroups: CardsGroup[];
}
