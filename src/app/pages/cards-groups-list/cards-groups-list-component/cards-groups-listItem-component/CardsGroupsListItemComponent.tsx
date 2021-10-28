import React, {FC} from "react"
import format from 'date-fns/format'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon/ListItemIcon';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import {useHistory} from 'react-router';

import {DATE_FORMAT} from '../../../../common/Constants';
import {ICardsGroup} from '../../../../types/ICardsGroup';
import {CircularProgressComponent} from './circular-progress-component/CircularProgressComponent';
import {Routs} from '../../../../common/Routs';

export const CardsGroupsListItemComponent: FC<ICardsGroupsListItemComponent> = ({cardsGroup}) => {

    const history = useHistory();

    const onClick = (cardsGroupID: number): any => () => {
        history.push({
            pathname: Routs.cards.path,
            state: {
                cardsGroupID : cardsGroupID
            }
        })
    };

    return <>
        <ListItem onClick={onClick(cardsGroup.id)} key={cardsGroup.id} button>
            <ListItemIcon>
                <CircularProgressComponent percent={cardsGroup.percentRepeatedCards || 0}/>
            </ListItemIcon>
            <ListItemText
                primary={cardsGroup.nameCardsGroup}
                secondary={'Last repeating date: ' + format(cardsGroup.dateRepeating ? cardsGroup.dateRepeating : new Date(), DATE_FORMAT)}
            />
        </ListItem>
    </>
};

interface ICardsGroupsListItemComponent {

    cardsGroup: ICardsGroup;
}
