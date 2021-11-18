import React, {FC} from "react"
import format from 'date-fns/format'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import FlagIcon from '@mui/icons-material/Flag';

import {DATE_FORMAT} from '../../../../common/Constants';
import {ICard} from '../../../../types/ICard';
import {IRangeOfKnowledge} from '../../../../types/IRangeOfKnowledge';
import {ListItemMenuComponent} from '../../../../common/elements/list-item-menu/ListItemMenuComponent';

export const CardsListItemComponent: FC<ICardListItemComponent> = ({card, onEditItem, onDeleteItem, onResetProgress}) => {

    const getIconColor = (card: ICard): string => {
        if(card.rangeOfKnowledge === IRangeOfKnowledge.DONE){
            return 'green'
        }
        if(card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS){
            return 'yellow'
        }
        return 'red'
    };

    return <ListItem key={card.id} button>
        <ListItemIcon>
             <FlagIcon style={{color: getIconColor(card)}}/>
        </ListItemIcon>
        <ListItemText
            primary={card.question}
            secondary={'Last repeating date: ' + format(card.dateRepeating ? card.dateRepeating : new Date(), DATE_FORMAT)}
        />
        <ListItemIcon>
            <ListItemMenuComponent
                onEdit={() => onEditItem(card.id)}
                onDelete={() => onDeleteItem(card.id)}
                onResetProgress={() => onResetProgress(card.id)}
            />
        </ListItemIcon>
    </ListItem>
};

interface ICardListItemComponent {
    card: ICard;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onResetProgress: (id: number) => void;
}
