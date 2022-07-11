import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";

export const onConstructor: ICallback<ICardsGroupsCallbackSettings, void> = (
    {services}
) => {
    services.cardsGroupsListService.groupsListChannel.next('');
    services.cardsGroupsListService.filterChannel.next('');
}