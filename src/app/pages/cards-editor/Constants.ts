import {initDefaultCard} from "../../common/logic/initDefaultCard";

export const initialState = {
    card: initDefaultCard(),
    currentCardsGroup: {
        id: 0,
        nameCardsGroup: ''
    },
    cardsGroups: []
}