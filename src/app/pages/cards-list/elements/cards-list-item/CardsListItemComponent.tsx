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
import "./CardsListItemComponent.css";
import {Checkbox, ListItemButton} from "@mui/material";

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
            className="cards-list-item_card-name"
            onClick={() => isEnabledSelecting ? () => {
            } : onClickItem(card.id)}
            primary={card.question}
            secondary={'Last repeating date: ' + format(card.dateRepeating ? card.dateRepeating : new Date(), DATE_FORMAT)}
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
                <ListItemIcon>
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

interface ICardListItemComponent {
    card: ICard;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onResetProgress: (id: number) => void;
    onClickItem: (id: number) => void;
    onSelect: (id: number) => void;
    isEnabledSelecting: boolean;
    isSelected: boolean
}
