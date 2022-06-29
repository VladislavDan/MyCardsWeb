import React, {FC} from "react"
import format from 'date-fns/format'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import FlagIcon from '@mui/icons-material/Flag';
import {Checkbox} from "@mui/material";

import {DATE_FORMAT} from '../../../../common/Constants';
import {ICard} from '../../../../common/types/ICard';
import {IRangeOfKnowledge} from '../../../../common/types/IRangeOfKnowledge';
import {ListItemMenuComponent} from '../../../../common/elements/list-item-menu/ListItemMenuComponent';
import {ICardListItemComponent} from "./types/ICardListItemComponent";
import {CardPrimaryTextComponent} from "../card-primary-text/CardPrimaryTextComponent";

export const CardsListItemComponent: FC<ICardListItemComponent> = (
    {
        card,
        onEditItem,
        onDeleteItem,
        onResetProgress,
        onClickItem,
        onSelect,
        isEnabledSelecting,
        isSelected
    }
) => {

    const dateText = 'Last repeating date: ' + format(card.dateRepeating ? card.dateRepeating : new Date(), DATE_FORMAT)

    const getIconColor = (card: ICard): string => {
        if (card.rangeOfKnowledge === IRangeOfKnowledge.DONE) {
            return 'green'
        }
        if (card.rangeOfKnowledge === IRangeOfKnowledge.IN_PROGRESS) {
            return 'yellow'
        }
        return 'red'
    };

    return <ListItem key={card.id} button>
        <ListItemIcon onClick={() => onClickItem(card.id)}>
            <FlagIcon style={{color: getIconColor(card)}}/>
        </ListItemIcon>
        <ListItemText
            onClick={() => onClickItem(card.id)}
            primary={<CardPrimaryTextComponent card={card}/>}
            secondary={dateText}
        />
        {
            !isEnabledSelecting ?
                <ListItemIcon>
                    <ListItemMenuComponent
                        onEdit={() => onEditItem(card.id)}
                        onDelete={() => onDeleteItem(card.id)}
                        onResetProgress={() => onResetProgress(card.id)}
                    />
                </ListItemIcon> :
                <ListItemIcon onClick={() => isEnabledSelecting && onSelect(card.id)}>
                    <Checkbox
                        edge="start"
                        checked={isSelected}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
        }
    </ListItem>
};
