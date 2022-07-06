import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {ISortVariants} from "../../../common/types/ISortVariants";

export const onConstructor: ICallback<CardsContainerCallbackSettings, ISortVariants> = (
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