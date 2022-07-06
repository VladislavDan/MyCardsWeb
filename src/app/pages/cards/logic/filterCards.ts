import {ICard} from "../../../common/types/ICard";
import {IFilter} from "../../../common/types/IFilter";
import {ISortVariants} from "../../../common/types/ISortVariants";

export const filterCards = (cards: ICard[], filter: IFilter) => {
    const foundByTextCards = cards.filter((card: ICard) => {
        return card.question.toLowerCase().indexOf(filter.searchableText.toLowerCase()) > -1 ||
            card.answer.toLowerCase().indexOf(filter.searchableText.toLowerCase()) > -1
    })

    let sortedCards = []

    if(filter.sort === ISortVariants.QUESTION_DESK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if(card1.question === card2.question) {
                return 0
            } else if(card1.question > card2.question) {
                return 1
            } else {
                return -1
            }
        })

        return sortedCards;
    } else if(filter.sort === ISortVariants.QUESTION_ASK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if(card1.question === card2.question) {
                return 0
            } else if(card1.question > card2.question) {
                return -1
            } else {
                return 1
            }
        })
        return sortedCards;
    } else if(filter.sort === ISortVariants.STATUS_ASK) {
        sortedCards = foundByTextCards.sort((card1: ICard, card2: ICard) => {
            if(card1.rangeOfKnowledge === card2.rangeOfKnowledge) {
                return 0
            } else if(card1.rangeOfKnowledge > card2.rangeOfKnowledge) {
                return -1
            } else {
                return 1
            }
        })
        return sortedCards;
    } else if(filter.sort === ISortVariants.STATUS_DESK) {
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
    } else if (filter.sort === ISortVariants.DATE_ASK) {
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
    } else if (filter.sort === ISortVariants.DATE_DESK) {
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
    }

    return foundByTextCards
}