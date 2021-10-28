import React, {FC} from "react"
import format from 'date-fns/format'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import FlagIcon from '@mui/icons-material/Flag';

import {DATE_FORMAT} from '../../../../common/Constants';
import {ICard} from '../../../../types/ICard';
import {IRangeOfKnowledge} from '../../../../types/IRangeOfKnowledge';

export const CardsListItemComponent: FC<ICardListItemComponent> = ({card}) => {

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
    </ListItem>
};

interface ICardListItemComponent {
    card: ICard;
}
