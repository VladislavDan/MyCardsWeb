import React, {FC} from "react";
import {FixedSizeList as List} from 'react-window';

import './CardsGroupsListComponent.css'
import {AddButtonComponent} from '../../common/elements/add-button/AddButtonComponent';
import {CardsGroupsListItemComponent} from './elements/cards-groups-list-item/CardsGroupsListItemComponent';
import {ICardsGroupsListComponent} from "./types/ICardsGroupsListComponent";
import {FilterComponent} from "../../common/elements/filter/FilterComponent";

export const CardsGroupsListComponent: FC<ICardsGroupsListComponent> = (
    {
        cardsGroups,
        onClickItem,
        onEditItem,
        onDeleteItem,
        onOpenEditor,
        onResetProgress,
        onChangeSearchableText,
        onChangeSorting,
        filter,
        height,
        width
    }
) => {

    return <>
        <FilterComponent
            filter={filter}
            onChangeSearchableText={onChangeSearchableText}
            onChangeSorting={onChangeSorting}
        />
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
