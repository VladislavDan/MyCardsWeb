import React, {FC} from "react";
import List from '@material-ui/core/List';

import {CardsGroup} from '../../../types/CardsGroup';
import {CardsGroupsListItemComponent} from './elements/CardsGroupsListItemComponent';

export const CardsGroupsListComponent: FC<ICardsGroupsListComponent> = ({cardsGroups}) => {

    return <List component="nav" aria-label="contacts">
        {cardsGroups.map((cardsGroup: CardsGroup) => {
            return <CardsGroupsListItemComponent cardsGroup={cardsGroup}/>
        })}
    </List>
};

interface ICardsGroupsListComponent {
    cardsGroups: CardsGroup[];
}
