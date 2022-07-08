import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {defaultCardValue} from "../../../common/Constants";

export const onClickYesNoButton: ICallback<CardViewerCallbackSettings, boolean> = (
    {
        state,
        setState,
        services,
        location
    },
    args = false
) => {
    if (state.card) {
        services.cardViewerService.repeatingResultChannel.next({
            isKnown: args,
            cardID: state.card.id,
            cardsGroupID: location.state.cardsGroupID
        });
    } else {
        setState(() => {
            return {
                card: defaultCardValue,
                isQuestionSide: false,
                isEditable: false
            }
        });
    }
}