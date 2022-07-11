import {ISortVariant} from "./types/ISortVariant";
import {IRangeOfKnowledge} from "./types/IRangeOfKnowledge";

export const defaultStatisticValue = {
    inProgress: 0,
    todo: 0,
    done: 0
};

export const defaultCardsGroupValue = {
    cards: [],
    nameCardsGroup: '',
    repeatingDate: new Date().getTime(),
    id: new Date().getTime(),
    percentRepeatedCards: 0
}

export const defaultAppState = {
    height: 0,
    width: 0
};

export const defaultFilterValue = {
    searchableText: '',
    sort: ISortVariant.NONE
}

export const defaultCardValue = {
    id: -1,
    question: '',
    answer: '',
    rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
    dateRepeating: 0
}

export const defaultSimplifiedGroupValue = {
    nameCardsGroup: '',
    id: -1
}

export const DATE_FORMAT = "dd-MM-yyyy";
export const STORE_NAME = "cards-store";
