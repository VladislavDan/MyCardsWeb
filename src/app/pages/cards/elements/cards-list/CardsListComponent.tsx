import {FixedSizeList as List} from "react-window";
import * as React from "react";
import {FC} from "react";

import {CardsListItemComponent} from "../cards-list-item/CardsListItemComponent";
import {ICardsListComponent} from "./types/ICardsListComponent";

export const CardsListComponent: FC<ICardsListComponent> = (
    {
        cards,
        width,
        height,
        onEditItem,
        onDeleteItem,
        onSelectItem,
        onResetProgress,
        onClickItem,
        isEnabledSelecting,
        selectedItems
    }
) => {
    return <List
        className="cards"
        itemData={cards}
        itemSize={55}
        itemCount={cards.length}
        overscanCount={5}
        height={height}
        width={width}
    >
        {
            ({index, style}: any) => {
                const card = cards[index];
                return <div style={style}>
                    <CardsListItemComponent
                        key={card.id}
                        card={card}
                        onEditItem={onEditItem}
                        onDeleteItem={onDeleteItem}
                        onResetProgress={onResetProgress}
                        onClickItem={onClickItem}
                        onSelect={onSelectItem}
                        isEnabledSelecting={isEnabledSelecting}
                        isSelected={selectedItems[card.id]}
                    />
                </div>
            }
        }
    </List>
}