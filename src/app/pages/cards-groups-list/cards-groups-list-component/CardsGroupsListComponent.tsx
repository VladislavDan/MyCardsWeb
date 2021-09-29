import React, {FC} from "react";
import List from '@material-ui/core/List';

import {ICardsGroup} from '../../../types/ICardsGroup';
import {CardsGroupsListItemComponent} from './cards-groups-listItem-component/CardsGroupsListItemComponent';

export const CardsGroupsListComponent: FC<ICardsGroupsListComponent> = ({cardsGroups}) => {

    return <List component="nav" aria-label="contacts">
        {cardsGroups.map((cardsGroup: ICardsGroup) => {
            return <CardsGroupsListItemComponent key={cardsGroup.id} cardsGroup={cardsGroup}/>
        })}
    </List>
};

interface ICardsGroupsListComponent {
    cardsGroups: ICardsGroup[];
}
