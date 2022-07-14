import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";

export const onSaveCard: ICallback<CardsEditorCallbackSettings, void> = (
    {services, state, location}
) => {
    services.cardsEditorService.cardEditingChannel.next(
        {card: state.card, cardsGroupID: location.state.cardsGroupID}
    );
}