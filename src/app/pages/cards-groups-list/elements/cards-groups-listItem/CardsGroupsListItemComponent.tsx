import React, {FC} from "react"
import format from 'date-fns/format'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';

import {DATE_FORMAT} from '../../../../common/Constants';
import {ICardsGroup} from '../../../../types/ICardsGroup';
import {CircularProgressComponent} from '../circular-progress/CircularProgressComponent';
import {CardsGroupMenuComponent} from '../cards-group-menu/CardsGroupMenuComponent';

export const CardsGroupsListItemComponent: FC<ICardsGroupsListItemComponent> = ({cardsGroup, onClickItem, onEditItem, onDeleteItem}) => {

    return <>
        <ListItem onClick={() => onClickItem(cardsGroup.id)} key={cardsGroup.id} button>
            <ListItemIcon>
                <CircularProgressComponent percent={cardsGroup.percentRepeatedCards || 0}/>
            </ListItemIcon>
            <ListItemText
                primary={cardsGroup.nameCardsGroup}
                secondary={'Last repeating date: ' + format(cardsGroup.dateRepeating ? cardsGroup.dateRepeating : new Date(), DATE_FORMAT)}
            />
            <ListItemIcon>
                <CardsGroupMenuComponent onEdit={() => onEditItem(cardsGroup.id)} onDelete={() => onDeleteItem(cardsGroup.id)}/>
            </ListItemIcon>
        </ListItem>
    </>
};

interface ICardsGroupsListItemComponent {
    cardsGroup: ICardsGroup;
    onClickItem: (id: number) => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
}
