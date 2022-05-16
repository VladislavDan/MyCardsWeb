import React, {FC} from "react";
import {FixedSizeList as List} from 'react-window';

import {ICardsGroup} from '../../common/types/ICardsGroup';
import './CardsGroupsListComponent.css'
import {AddButtonComponent} from '../../common/elements/add-button/AddButtonComponent';
import {CardsGroupsListItemComponent} from './elements/cards-groups-list-item/CardsGroupsListItemComponent';

export const CardsGroupsListComponent: FC<ICardsGroupsListComponent> = (
    {
        cardsGroups,
        onClickItem,
        onEditItem,
        onDeleteItem,
        onOpenEditor,
        onResetProgress,
        height,
        width
    }
) => {

    return <>
        <List
            className="cards-groups"
            itemData={cardsGroups}
            itemSize={55}
            itemCount={cardsGroups.length}
            overscanCount={5}
            height={height}
            width={width}
        >
            {({index, style}: any) => {
                const cardGroup = cardsGroups[index];
                return <div style={style}><CardsGroupsListItemComponent
                    key={cardGroup.id}
                    cardsGroup={cardGroup}
                    onClickItem={onClickItem}
                    onEditItem={onEditItem}
                    onDeleteItem={onDeleteItem}
                    onResetProgress={onResetProgress}
                /></div>
            }}
        </List>
        <AddButtonComponent onClick={onOpenEditor}/>
    </>
};

interface ICardsGroupsListComponent {
    cardsGroups: ICardsGroup[];
    onClickItem: (id: number) => void;
    onEditItem: (id: number) => void;
    onDeleteItem: (id: number) => void;
    onOpenEditor: () => void;
    onResetProgress: (id: number) => void;
    height: number;
    width: number
}
