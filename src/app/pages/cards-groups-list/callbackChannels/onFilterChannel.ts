import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {IFilter} from "../../../common/types/IFilter";
import {defaultFilterValue} from "../../../common/Constants";

export const onFilterChannel: ICallback<ICardsGroupsCallbackSettings, IFilter> = (
    {state, setState, services},
    filter = defaultFilterValue
) => {
    setState((prevState) => {
        return {
            ...prevState,
            filter
        }
    });
}