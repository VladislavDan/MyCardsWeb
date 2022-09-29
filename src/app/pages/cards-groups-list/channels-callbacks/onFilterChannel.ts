import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {IFilter} from "../../../common/types/IFilter";
import {defaultFilter} from "../../../common/defaults/defaultFilter";

export const onFilterChannel: ICallback<ICardsGroupsCallbackSettings, IFilter> = (
    {setState, services},
    filter = defaultFilter
) => {
    setState((prevState) => {
        return {
            ...prevState,
            filter
        }
    });
}