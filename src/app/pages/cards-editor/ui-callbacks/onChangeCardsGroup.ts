import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";

export const onChangeCardsGroup: ICallback<CardsEditorCallbackSettings, number> = (
    {services},
    cardsGroupID = -1
) => {
    services.cardsEditorService.simplifiedCardsGroupsChannel.next(cardsGroupID);
}