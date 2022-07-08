import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onConstructor: ICallback<CardViewerCallbackSettings, void> = (
    {services, location}
) => {
    services.cardViewerService.cardChannel.next(location.state.cardID);
}