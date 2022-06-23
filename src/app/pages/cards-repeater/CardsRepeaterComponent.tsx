import React, {FC} from 'react';

import {StatisticComponent} from './elements/statistic/StatisticComponent';
import "./CardsRepeaterComponent.css"
import {AllCardsRepeatedComponent} from './elements/all-cards-repeated/AllCardsRepeatedComponent';
import {CardsContentComponent} from "../../common/elements/cards-content/CardsContentComponent";
import {ICardsRepeaterComponent} from "./types/ICardsRepeaterComponent";

export const CardsRepeaterComponent: FC<ICardsRepeaterComponent> = (
    {
            card,
            cardHeight,
            isQuestionSide,
            onClickCard,
            onClick,
            statistic,
            onBackClick,
            onSwitchEditing,
            isEditable,
            onChangeAnswer,
            onChangeQuestion,
            onDeleteCard
    }
) => {

        return card && card.id !== -1 ?
            <div className="cards-repeater">
                    <StatisticComponent statistic={statistic}/>
                    <CardsContentComponent
                        card={card}
                        onDeleteCard={onDeleteCard}
                        onClick={onClick}
                        isQuestionSide={isQuestionSide}
                        onClickCard={onClickCard}
                        cardHeight={cardHeight}
                        onSwitchEditing={onSwitchEditing}
                isEditable={isEditable}
                onChangeQuestion={onChangeQuestion}
                onChangeAnswer={onChangeAnswer}
            />
        </div> :
        <AllCardsRepeatedComponent onBackClick={onBackClick}/>
};
