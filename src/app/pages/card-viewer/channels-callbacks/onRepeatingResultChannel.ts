import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onRepeatingResultChannel: ICallback<CardViewerCallbackSettings, ICardsGroup[]> = (
    {services, location}
) => {
    services.cardViewerService.cardChannel.next(location.state.cardID);
}