import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onRepeatingResultChannel: ICallback<CardViewerCallbackSettings, ICardsGroup[]> = (
    {services, location}
) => {
    services.cardViewerService.cardChannel.next(location.state.cardID);
}