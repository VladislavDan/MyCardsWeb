import {ICardsGroup} from '../../../common/types/ICardsGroup';
import {IFilter} from "../../../common/types/IFilter";
import {ISortVariant} from "../../../common/types/ISortVariant";

export const sortByFilter = (cardsGroups: ICardsGroup[], filter: IFilter) => {
    let sortedCards = cardsGroups.filter(
        (cardsGroup) => cardsGroup.nameCardsGroup.toLowerCase().indexOf(filter.searchableText.toLowerCase()) > -1
    );
    if (filter.sort === ISortVariant.NAME_ASK) {
        sortedCards = sortedCards && sortedCards.sort((firstCardGroup: ICardsGroup, secondCardsGroup: ICardsGroup) => {
            if (firstCardGroup.nameCardsGroup > secondCardsGroup.nameCardsGroup) {
                return 1
            }
            if (firstCardGroup.nameCardsGroup < secondCardsGroup.nameCardsGroup) {
                return -1
            }
            return 0
        })
    } else if (filter.sort === ISortVariant.NAME_DESK) {
        sortedCards = sortedCards && sortedCards.sort((firstCardGroup: ICardsGroup, secondCardsGroup: ICardsGroup) => {
            if (firstCardGroup.nameCardsGroup > secondCardsGroup.nameCardsGroup) {
                return -1
            }
            if (firstCardGroup.nameCardsGroup < secondCardsGroup.nameCardsGroup) {
                return 1
            }
            return 0
        })
    } else if (filter.sort === ISortVariant.DATE_ASK) {
        sortedCards = sortedCards && sortedCards.sort((firstCardGroup: ICardsGroup, secondCardsGroup: ICardsGroup) => {
            if (firstCardGroup.repeatingDate && secondCardsGroup.repeatingDate) {
                if (firstCardGroup.repeatingDate > secondCardsGroup.repeatingDate) {
                    return 1
                }
                if (firstCardGroup.repeatingDate < secondCardsGroup.repeatingDate) {
                    return -1
                }
            }
            return 0
        })
    } else if (filter.sort === ISortVariant.DATE_DESK) {
        sortedCards = sortedCards && sortedCards.sort((firstCardGroup: ICardsGroup, secondCardsGroup: ICardsGroup) => {
            if (firstCardGroup.repeatingDate && secondCardsGroup.repeatingDate) {
                if (firstCardGroup.repeatingDate < secondCardsGroup.repeatingDate) {
                    return 1
                }
                if (firstCardGroup.repeatingDate > secondCardsGroup.repeatingDate) {
                    return -1
                }
            }
            return 0
        })
    } else if (filter.sort === ISortVariant.PROGRESS_ASK) {
        sortedCards = sortedCards && sortedCards.sort((firstCardGroup: ICardsGroup, secondCardsGroup: ICardsGroup) => {
            if (firstCardGroup.percentRepeatedCards && secondCardsGroup.percentRepeatedCards) {
                if (firstCardGroup.percentRepeatedCards < secondCardsGroup.percentRepeatedCards) {
                    return 1
                }
                if (firstCardGroup.percentRepeatedCards > secondCardsGroup.percentRepeatedCards) {
                    return -1
                }
            }
            return 0
        })
    } else if (filter.sort === ISortVariant.PROGRESS_DESC) {
        sortedCards = sortedCards && sortedCards.sort((firstCardGroup: ICardsGroup, secondCardsGroup: ICardsGroup) => {
            if (firstCardGroup.percentRepeatedCards && secondCardsGroup.percentRepeatedCards) {
                if (firstCardGroup.percentRepeatedCards > secondCardsGroup.percentRepeatedCards) {
                    return 1
                }
                if (firstCardGroup.percentRepeatedCards < secondCardsGroup.percentRepeatedCards) {
                    return -1
                }
            }
            return 0
        })
    }

    return sortedCards;
};
