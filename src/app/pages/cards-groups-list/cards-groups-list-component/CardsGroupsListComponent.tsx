import React, {FC} from "react";
import List from '@material-ui/core/List';

import {CardsGroup} from '../../../types/CardsGroup';
import {CardsGroupsListItemComponent} from './cards-groups-listItem-component/CardsGroupsListItemComponent';

export const CardsGroupsListComponent: FC<ICardsGroupsListComponent> = ({cardsGroups}) => {

    return <List component="nav" aria-label="contacts">
        {cardsGroups.map((cardsGroup: CardsGroup) => {
            return <CardsGroupsListItemComponent key={cardsGroup.id} cardsGroup={cardsGroup}/>
        })}
    </List>
};

interface ICardsGroupsListComponent {
    cardsGroups: CardsGroup[];
}
