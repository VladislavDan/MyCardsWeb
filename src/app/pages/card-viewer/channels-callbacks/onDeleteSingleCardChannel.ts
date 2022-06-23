import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onDeleteSingleCardChannel: ICallback<CardViewerCallbackSettings, ICardsGroup[]> = (
    {history}
) => {
    history.goBack();
}