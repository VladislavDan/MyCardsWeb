import React, {useEffect, useState} from "react";

import {CardsGroupsListComponent} from './elements/CardsGroupsListComponent';
import {useSubscribe} from '../../common/hooks/useSubscribe';
import {cardsGroupsListManager} from './CardsGroupsListManager';
import {CardsGroup} from '../../types/CardsGroup';

export const CardsGroupsListContainer = () => {

    const [state, setState] = useState<CardsGroupsListContainerState>({cardsGroups: []});

    useEffect(() => {
       if(state.cardsGroups.length === 0) {
           cardsGroupsListManager.groupsListChannel.next('');
       }
    });

    useSubscribe<CardsGroup[]>(cardsGroupsListManager.groupsListChannel, (cardsGroups: CardsGroup[]) => {
        setState({cardsGroups: cardsGroups})
    });

    return <CardsGroupsListComponent cardsGroups={state.cardsGroups}/>
};

interface CardsGroupsListContainerState {
    cardsGroups: CardsGroup[];
}
