import React, {FC} from "react"
import format from 'date-fns/format'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';

import {DATE_FORMAT} from '../../../../common/Constants';
import {CardsGroup} from '../../../../types/CardsGroup';
import {CircularProgressComponent} from './elements/CircularProgressComponent';
import {useHistory} from 'react-router';
import {Routs} from '../../../../common/Routs';

export const CardsGroupsListItemComponent: FC<ICardsGroupsListItemComponent> = ({cardsGroup}) => {

    const history = useHistory();

    const onClick = (cardsGroupID: string): any => () => {
        history.push({
            pathname: Routs.cards.path,
            state: cardsGroupID
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

    cardsGroup: CardsGroup;
}
