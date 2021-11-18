import React, {FC} from "react";
import List from '@mui/material/List';

import {ICardsGroup} from '../../types/ICardsGroup';
import {CardsGroupsListItemComponent} from './elements/cards-groups-list-item/CardsGroupsListItemComponent';
import './CardsGroupsListComponent.css'
import {AddButton} from '../../common/elements/add-button/AddButton';

export const CardsGroupsListComponent: FC<ICardsGroupsListComponent> = ({cardsGroups, onClickItem, onEditItem, onDeleteItem, onOpenEditor, onResetProgress}) => {

    return <>
        <List component="nav" aria-label="contacts" className="cards-groups">
            {cardsGroups.map((cardsGroup: ICardsGroup) => {
                return <CardsGroupsListItemComponent
                    key={cardsGroup.id}
                    cardsGroup={cardsGroup}
                    onClickItem={onClickItem}
                    onEditItem={onEditItem}
                    onDeleteItem={onDeleteItem}
                    onResetProgress={onResetProgress}
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
    onResetProgress: (id: number) => void;
}
