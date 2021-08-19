import React, {useState} from "react";

import {CardsGroupsListComponent} from './elements/CardsGroupsListComponent';
import {useSubscribe} from '../../common/hooks/useSubscribe';
import {cardsGroupsListManager} from './CardsGroupsListManager';
import {CardsGroup} from '../../types/CardsGroup';
import {useFirstRender} from '../../common/hooks/useFirstRender';

export const CardsGroupsListContainer = () => {

    const [state, setState] = useState<CardsGroupsListContainerState>({cardsGroups: []});

    useSubscribe<CardsGroup[]>(cardsGroupsListManager.groupsListChannel, (cardsGroups: CardsGroup[]) => {
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
