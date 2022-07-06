import {ISortVariants} from "./types/ISortVariants";

export const defaultAppState = {
    height: 0,
    width: 0,
    updateContext: () => {
    }
};

export const defaultFilterValue = {
    searchableText: '',
    sort: ISortVariants.NONE
}

export const DATE_FORMAT = "dd-MM-yyyy";
export const STORE_NAME = "cards-store";
