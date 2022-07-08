import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICard} from "../../../common/types/ICard";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";

export const onCardEditingChannel: ICallback<CardsEditorCallbackSettings, ICard> = (
    {history}
) => {
    history.goBack();
}