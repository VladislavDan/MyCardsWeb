import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {ISortVariant} from "../../../common/types/ISortVariant";

export const onConstructor: ICallback<CardsCallbackSettings, ISortVariant> = (
    {services, setState, location}
) => {
    const {cardsListService} = services;
    setState((prevState) => {
        cardsListService.filterChannel.next('')
        cardsListService.existedGroupsIDsChannel.next('');
        return prevState;
    })
}