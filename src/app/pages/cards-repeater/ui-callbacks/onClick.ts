import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";
import {IRangeOfKnowledge} from "../../../common/types/IRangeOfKnowledge";

export const onClick: ICallback<CardRepeaterCallbackSettings, boolean> = (
    {
        setState,
        location,
        services: {cardsRepeaterService}
    },
    isKnown = false
) => {
    setState((prevState) => {
        if (prevState.card) {
            cardsRepeaterService.repeatingResultChannel.next({
                isKnown: isKnown,
                cardID: prevState.card.id,
                cardsGroupID: location.state.cardsGroupID
            });
            return prevState;
        } else {
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
        }
    });
}