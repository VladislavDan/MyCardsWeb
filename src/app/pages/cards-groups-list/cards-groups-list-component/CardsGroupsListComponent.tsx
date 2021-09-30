import React, {FC} from "react";
import List from '@material-ui/core/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {ICardsGroup} from '../../../types/ICardsGroup';
import {CardsGroupsListItemComponent} from './cards-groups-listItem-component/CardsGroupsListItemComponent';
import './CardsGroupsListComponent.css'

export const CardsGroupsListComponent: FC<ICardsGroupsListComponent> = ({cardsGroups}) => {

    return <>
        <List component="nav" aria-label="contacts" className="cards-groups">
            {cardsGroups.map((cardsGroup: ICardsGroup) => {
                return <CardsGroupsListItemComponent key={cardsGroup.id} cardsGroup={cardsGroup}/>
            })}
        </List>
        <Fab size="medium" color="secondary" aria-label="add" className="cards-groups_fab">
            <AddIcon/>
        </Fab>
    </>
};

interface ICardsGroupsListComponent {
    cardsGroups: ICardsGroup[];
}
