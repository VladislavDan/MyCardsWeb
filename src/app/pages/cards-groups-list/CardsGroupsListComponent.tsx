import React, {FC} from 'react';
import {FixedSizeList as List} from 'react-window';

import './CardsGroupsListComponent.css'
import {AddButtonComponent} from '../../common/elements/add-button/AddButtonComponent';
import {CardsGroupsListItemComponent} from './elements/cards-groups-list-item/CardsGroupsListItemComponent';
import {ICardsGroupsListComponent} from './types/ICardsGroupsListComponent';
import {FilterComponent} from '../../common/elements/filter/FilterComponent';
import {ISortVariant} from '../../common/types/ISortVariant';

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
        onStartRepeatingDifficultCards,
        filter,
        height,
    }
) => {

    return <>
        <FilterComponent
            filter={filter}
            onChangeSearchableText={onChangeSearchableText}
            onChangeSorting={onChangeSorting}
            sortVariants={[
                ISortVariant.NONE,
                ISortVariant.DATE_ASK,
                ISortVariant.DATE_DESK,
                ISortVariant.NAME_ASK,
                ISortVariant.NAME_DESK,
                ISortVariant.PROGRESS_ASK,
                ISortVariant.PROGRESS_DESC
            ]}
        />
        <List
            className="cards-groups"
            itemData={cardsGroups}
            itemSize={55}
            itemCount={cardsGroups.length}
            overscanCount={5}
            height={height}
            width="100%"
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
                    onStartRepeatingDifficultCards={onStartRepeatingDifficultCards}
                /></div>
            }}
        </List>
        <AddButtonComponent onClick={onOpenEditor}/>
    </>
};
