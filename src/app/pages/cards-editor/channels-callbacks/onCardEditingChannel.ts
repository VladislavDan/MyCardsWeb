import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ICard} from "../../../common/types/ICard";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";

export const onCardEditingChannel: ICallback<CardsEditorCallbackSettings, ICard> = (
    {history}
) => {
    history.goBack();
}