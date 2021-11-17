import React, {FC} from "react";
import List from '@mui/material/List';

import {ICardsGroup} from '../../types/ICardsGroup';
import {CardsGroupsListItemComponent} from './elements/cards-groups-list-item/CardsGroupsListItemComponent';
import './CardsGroupsListComponent.css'
import {AddButton} from '../../common/elements/add-button/AddButton';

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
        <AddButton onClick={onOpenEditor}/>
    </>
};

interface ICardsGroupsListComponent {
    cardsGroups: ICardsGroup[];
    onClickItem: (id: number) => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onOpenEditor: () => void;
}
