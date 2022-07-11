import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {ISortVariant} from "../../../common/types/ISortVariant";

export const onConstructor: ICallback<CardsContainerCallbackSettings, ISortVariant> = (
    {services, location, state}
) => {
    const {cardsListService} = services;
    cardsListService.filterChannel.next('')
    cardsListService.cardsChannel.next({
        cardsGroupID: location.state.cardsGroupID,
        filter: state.filter
    });
    cardsListService.existedGroupsIDsChannel.next('');
}