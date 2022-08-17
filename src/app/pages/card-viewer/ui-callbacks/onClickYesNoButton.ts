import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {defaultCard} from "../../../common/defaults/defaultCard";

export const onClickYesNoButton: ICallback<CardViewerCallbackSettings, boolean> = (
    {
        setState,
        services,
        location
    },
    args = false
) => {

    setState((prevState) => {
        if (prevState.card) {
            services.cardViewerService.repeatingResultChannel.next({
                isKnown: args,
                cardID: prevState.card.id,
                cardsGroupID: location.state.cardsGroupID
            });
            return prevState;
        } else {
            return {
                card: defaultCard,
                isQuestionSide: false,
                isEditable: false
            }
        }
    });
}