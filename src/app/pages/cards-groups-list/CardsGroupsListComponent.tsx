import React, {FC} from "react";
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import {ICardsGroup} from '../../types/ICardsGroup';
import {CardsGroupsListItemComponent} from './elements/cards-groups-list-item/CardsGroupsListItemComponent';
import './CardsGroupsListComponent.css'

export const CardsGroupsListComponent: FC<ICardsGroupsListComponent> = ({cardsGroups, onClickItem, onEditItem, onDeleteItem, onOpenEditor}) => {

    return <>
        <List component="nav" aria-label="contacts" className="cards-groups">
            {cardsGroups.map((cardsGroup: ICardsGroup) => {
                return <CardsGroupsListItemComponent
                    key={cardsGroup.id}
                    cardsGroup={cardsGroup}
                    onClickItem={onClickItem}
                    onEditItem={onEditItem}
                    onDeleteItem={onDeleteItem}
                />
            })}
        </List>
        <Fab size="medium" color="secondary" aria-label="add" className="cards-groups_fab" onClick={onOpenEditor}>
            <AddIcon/>
        </Fab>
    </>
};

interface ICardsGroupsListComponent {
    cardsGroups: ICardsGroup[];
    onClickItem: (id: number) => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onOpenEditor: () => void;
}
