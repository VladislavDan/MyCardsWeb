import {ISortVariants} from "./types/ISortVariants";
import {IRangeOfKnowledge} from "./types/IRangeOfKnowledge";

export const defaultAppState = {
    height: 0,
    width: 0
};

export const defaultFilterValue = {
    searchableText: '',
    sort: ISortVariants.NONE
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
