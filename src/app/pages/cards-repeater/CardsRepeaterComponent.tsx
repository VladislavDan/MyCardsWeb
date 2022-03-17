import React, {FC} from 'react';

import {ICard} from '../../types/ICard';
import {StatisticComponent} from './elements/statistic/StatisticComponent';
import {AnswerCardComponent} from '../../common/elements/answer-card/AnswerCardComponent';
import "./CardsRepeaterComponent.css"
import {IStatistic} from '../../types/IStatistic';
import {CardsHeaderComponent} from '../../common/elements/cards-header/CardsHeaderComponent';
import {AllCardsRepeatedComponent} from './elements/all-cards-repeated/AllCardsRepeatedComponent';
import {QuestionCardComponent} from '../../common/elements/question-card/QuestionCardComponent';

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
        onChangeQuestion
    }
) => {

    return card ?
        <div className="cards-repeater">
            <StatisticComponent statistic={statistic}/>
            <CardsHeaderComponent
                isQuestionSide={isQuestionSide}
                isEditable={isEditable}
                onSwitchEditing={onSwitchEditing}
            />
            {
                isQuestionSide ?
                    <QuestionCardComponent
                        card={card}
                        onClickCard={onClickCard}
                        cardHeight={cardHeight}
                        isEditable={isEditable}
                        onChangeQuestion={onChangeQuestion}
                    /> :
                    <AnswerCardComponent
                        card={card}
                        onClickText={onClickCard}
                        cardHeight={cardHeight}
                        onClick={onClick}
                        onChangeAnswer={onChangeAnswer}
                        isEditable={isEditable}
                    />
            }
        </div> :
        <AllCardsRepeatedComponent onBackClick={onBackClick}/>

};

interface ICardsRepeaterComponent {
    card: ICard | undefined;
    onClick: (isUnderstandable: boolean) => void;
    isQuestionSide: boolean;
    onClickCard: () => void;
    statistic: IStatistic;
    cardHeight: number;
    onBackClick: () => void;
    onSwitchEditing: () => void;
    isEditable: boolean;
    onChangeQuestion: (question: string) => void;
    onChangeAnswer: (answer: string) => void;
}
