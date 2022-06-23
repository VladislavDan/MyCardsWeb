import React, {FC} from "react";

import {CardsHeaderComponent} from "../cards-header/CardsHeaderComponent";
import {QuestionCardComponent} from "../question-card/QuestionCardComponent";
import {AnswerCardComponent} from "../answer-card/AnswerCardComponent";
import {ICardsContentComponent} from "./types/ICardsContentComponent";

export const CardsContentComponent: FC<ICardsContentComponent> = (
    {
        isQuestionSide,
        isEditable,
        onSwitchEditing,
        card,
        cardHeight,
        onClickCard,
        onChangeAnswer,
        onChangeQuestion,
        onDeleteCard,
        onClick
    }
) => {
    return <>
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
                    onDeleteCard={onDeleteCard}
                /> :
                <AnswerCardComponent
                    card={card}
                    onClickText={onClickCard}
                    cardHeight={cardHeight}
                    onClick={onClick}
                    onChangeAnswer={onChangeAnswer}
                    isEditable={isEditable}
                    onDeleteCard={onDeleteCard}
                />
        }
    </>
}