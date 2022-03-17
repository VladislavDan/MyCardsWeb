import React, {FC} from "react";

import {
    CardsHeaderComponent
} from "../../common/elements/cards-header/CardsHeaderComponent";
import {QuestionCardComponent} from "../../common/elements/question-card/QuestionCardComponent";
import {AnswerCardComponent} from "../../common/elements/answer-card/AnswerCardComponent";
import {ICard} from "../../types/ICard";

export const CardViewerComponent: FC<ICardViewerComponent> = (
    {
        card,
        cardHeight,
        isQuestionSide,
        onClickCard,
        onClick,
        onSwitchEditing,
        isEditable,
        onChangeAnswer,
        onChangeQuestion
    }
) => {

    return <div className="cards-repeater">
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
    </div>
};

interface ICardViewerComponent {
    card: ICard | undefined;
    onClick: (isUnderstandable: boolean) => void;
    isQuestionSide: boolean;
    onClickCard: () => void;
    cardHeight: number;
    onBackClick: () => void;
    onSwitchEditing: () => void;
    isEditable: boolean;
    onChangeQuestion: (question: string) => void;
    onChangeAnswer: (answer: string) => void;
}