import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onDeleteSingleCardChannel: ICallback<CardViewerCallbackSettings, ICardsGroup[]> = (
    {history}
) => {
    history.goBack();
}