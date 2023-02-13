import React, {FC} from 'react';

import {StatisticComponent} from './elements/statistic/StatisticComponent';
import './CardsRepeaterComponent.css'
import {AllCardsRepeatedComponent} from './elements/all-cards-repeated/AllCardsRepeatedComponent';
import {CardsContentComponent} from '../../common/elements/cards-content/CardsContentComponent';
import {ICardsRepeaterComponent} from './types/ICardsRepeaterComponent';

export const CardsRepeaterComponent: FC<ICardsRepeaterComponent> = (
    {
            card,
            cardHeight,
            isQuestionSide,
            onClickCard,
            onClickYesNoButton,
            repeatingProgress,
            onBackClick,
            onSwitchEditing,
            isEditable,
            onChangeAnswer,
            onChangeQuestion,
            onReadByVoiceEngine,
            onDeleteCard
    }
) => {

        return card && card.id !== -1 ?
            <div className="cards-repeater">
                    <StatisticComponent repeatingProgress={repeatingProgress}/>
                    <CardsContentComponent
                        card={card}
                        onDeleteCard={onDeleteCard}
                        onClickYesNoButton={onClickYesNoButton}
                        isQuestionSide={isQuestionSide}
                        onClickCard={onClickCard}
                        cardHeight={cardHeight}
                        onSwitchEditing={onSwitchEditing}
                        isEditable={isEditable}
                        onChangeQuestion={onChangeQuestion}
                        onChangeAnswer={onChangeAnswer}
                        onReadByVoiceEngine={onReadByVoiceEngine}
                    />
            </div> :
            <AllCardsRepeatedComponent onBackClick={onBackClick}/>
};
