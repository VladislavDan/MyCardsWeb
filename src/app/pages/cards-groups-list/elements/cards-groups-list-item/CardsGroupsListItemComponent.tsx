import React, {FC} from "react"
import format from 'date-fns/format'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';

import {DATE_FORMAT} from '../../../../common/Constants';
import {ICardsGroup} from '../../../../common/types/ICardsGroup';
import {CircularProgressComponent} from '../circular-progress/CircularProgressComponent';
import {ListItemMenuComponent} from '../../../../common/elements/list-item-menu/ListItemMenuComponent';
import './CardsGroupsListItemComponent.css'

export const CardsGroupsListItemComponent: FC<ICardsGroupsListItemComponent> = (
    {
        cardsGroup,
        onClickItem,
        onEditItem,
        onDeleteItem,
        onResetProgress
    }
) => {

    return <>
        <ListItem key={cardsGroup.id} button component="div">
            <ListItemIcon onClick={() => onClickItem(cardsGroup.id)}>
                <CircularProgressComponent percent={cardsGroup.percentRepeatedCards || 0}/>
            </ListItemIcon>
            <ListItemText
                className="cards-groups-list-item_card-name"
                onClick={() => onClickItem(cardsGroup.id)}
                primary={cardsGroup.nameCardsGroup}
                secondary={'Last repeating date: ' + format(cardsGroup.repeatingDate ? cardsGroup.repeatingDate : new Date(), DATE_FORMAT)}
            />
            <ListItemIcon>
                <ListItemMenuComponent
                    onEdit={() => onEditItem(cardsGroup.id)}
                    onDelete={() => onDeleteItem(cardsGroup.id)}
                    onResetProgress={() => onResetProgress(cardsGroup.id)}
                />
            </ListItemIcon>
        </ListItem>
    </>
};

interface ICardsGroupsListItemComponent {
    cardsGroup: ICardsGroup;
    onClickItem: (id: number) => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onResetProgress: (id: number) => void;
}
