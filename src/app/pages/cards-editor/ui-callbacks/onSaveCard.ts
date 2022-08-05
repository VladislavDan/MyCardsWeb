import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";

export const onSaveCard: ICallback<CardsEditorCallbackSettings, void> = (
    {services, setState, location}
) => {
    setState((prevState) => {
        services.cardsEditorService.cardEditingChannel.next(
            {card: prevState.card, cardsGroupID: location.state.cardsGroupID}
        );
        return prevState;
    })
}