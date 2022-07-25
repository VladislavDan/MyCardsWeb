import {ICard} from "../../../common/types/ICard";
import {IFilter} from "../../../common/types/IFilter";
import {ISortVariant} from "../../../common/types/ISortVariant";

export const filterCards = (cards: ICard[], filter: IFilter) => {
    const foundByTextCards = cards.filter((card: ICard) => {
        return card.question.toLowerCase().indexOf(filter.searchableText.toLowerCase()) > -1 ||
            card.answer.toLowerCase().indexOf(filter.searchableText.toLowerCase()) > -1
    })

    let sortedCards = []

    if (filter.sort === ISortVariant.QUESTION_DESK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.question === card2.question) {
                return 0
            } else if (card1.question > card2.question) {
                return 1
            } else {
                return -1
            }
        })

        return sortedCards;
    } else if (filter.sort === ISortVariant.QUESTION_ASK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.question === card2.question) {
                return 0
            } else if (card1.question > card2.question) {
                return -1
            } else {
                return 1
            }
        })
        return sortedCards;
    } else if (filter.sort === ISortVariant.STATUS_ASK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.rangeOfKnowledge === card2.rangeOfKnowledge) {
                return 0
            } else if (card1.rangeOfKnowledge > card2.rangeOfKnowledge) {
                return -1
            } else {
                return 1
            }
        })
        return sortedCards;
    } else if (filter.sort === ISortVariant.STATUS_DESK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.rangeOfKnowledge === card2.rangeOfKnowledge) {
                return 0
            } else if (card1.rangeOfKnowledge > card2.rangeOfKnowledge) {
                return 1
            } else {
                return -1
            }
        })
        return sortedCards;
    } else if (filter.sort === ISortVariant.DATE_ASK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.dateRepeating === card2.dateRepeating) {
                return 0
            } else if (card1.dateRepeating > card2.dateRepeating) {
                return 1
            } else {
                return -1
            }
        })
        return sortedCards;
    } else if (filter.sort === ISortVariant.DATE_DESK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.dateRepeating === card2.dateRepeating) {
                return 0
            } else if (card1.dateRepeating < card2.dateRepeating) {
                return 1
            } else {
                return -1
            }
        })
        return sortedCards;
    } else if (filter.sort === ISortVariant.ANSWER_ASK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.answer === card2.answer) {
                return 0
            } else if (card1.answer < card2.answer) {
                return 1
            } else {
                return -1
            }
        })
        return sortedCards;
    } else if (filter.sort === ISortVariant.ANSWER_DESK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.answer === card2.answer) {
                return 0
            } else if (card1.answer < card2.answer) {
                return -1
            } else {
                return 1
            }
        })
        return sortedCards;
    } else if (filter.sort === ISortVariant.PROGRESS_ASK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.rangeOfKnowledge > card2.rangeOfKnowledge) {
                return 0
            } else if (card1.rangeOfKnowledge < card2.rangeOfKnowledge) {
                return -1
            } else {
                return 1
            }
        })
        return sortedCards;
    } else if (filter.sort === ISortVariant.PROGRESS_DESC) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if (card1.rangeOfKnowledge < card2.rangeOfKnowledge) {
                return 0
            } else if (card1.rangeOfKnowledge > card2.rangeOfKnowledge) {
                return -1
            } else {
                return 1
            }
        })
        return sortedCards;
    }

    return foundByTextCards
}