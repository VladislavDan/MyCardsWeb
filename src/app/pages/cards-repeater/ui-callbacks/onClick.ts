import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {IRangeOfKnowledge} from "../../../common/types/IRangeOfKnowledge";

export const onClick: ICallback<CardRepeaterCallbackSettings, boolean> = (
    {
        setState,
        location,
        state,
        services: {cardsRepeaterService}
    },
    isKnown = false
) => {
    if (state.card) {
        cardsRepeaterService.repeatingResultChannel.next({
            isKnown: isKnown,
            cardID: state.card.id,
            cardsGroupID: location.state.cardsGroupID
        });
    } else {
        setState((prevState) => {
            return {
                ...prevState,
                card: {
                    id: -1,
                    question: '',
                    answer: '',
                    rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
                    dateRepeating: 0
                },
                isQuestionSide: false,
                isEditable: false
            }
        });
    }
}