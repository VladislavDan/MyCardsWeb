import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {ISortVariant} from "../../../common/types/ISortVariant";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onConstructor: ICallback<CardsCallbackSettings, ISortVariant> = (
    {services, setState, location}
) => {
    const {cardsListService} = services;
    setState((prevState) => {
        cardsListService.filterChannel.next(empty)
        cardsListService.existedGroupsIDsChannel.next(empty);
        return prevState;
    })
}