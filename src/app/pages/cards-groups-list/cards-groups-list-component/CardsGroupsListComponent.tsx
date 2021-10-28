import React, {FC} from "react";
import List from '@mui/material/List';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {useHistory} from 'react-router';

import {ICardsGroup} from '../../../types/ICardsGroup';
import {CardsGroupsListItemComponent} from './cards-groups-listItem-component/CardsGroupsListItemComponent';
import './CardsGroupsListComponent.css'
import {Routs} from '../../../common/Routs';

export const CardsGroupsListComponent: FC<ICardsGroupsListComponent> = ({cardsGroups}) => {

    const history = useHistory();

    const onOpenEditor = () => {
        history.push({
            pathname: Routs.cardsGroupEditor.path,
            state: {

            }
        })
    };

    return <>
        <List component="nav" aria-label="contacts" className="cards-groups">
            {cardsGroups.map((cardsGroup: ICardsGroup) => {
                return <CardsGroupsListItemComponent key={cardsGroup.id} cardsGroup={cardsGroup}/>
            })}
        </List>
        <Fab size="medium" color="secondary" aria-label="add" className="cards-groups_fab" onClick={onOpenEditor}>
            <AddIcon/>
        </Fab>
    </>
};

interface ICardsGroupsListComponent {
    cardsGroups: ICardsGroup[];
}
