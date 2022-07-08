import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";
import {CardsContainerState} from "../types/CardsContainerState";

export const onExistedGroupsIDsChannel: ICallback<CardsContainerCallbackSettings, { id: number; label: string; }[]> = (
    {state, setState},
    existedGroupsIDs = []
) => {
    setState((prevState: CardsContainerState) => {
        return {
            ...prevState,
            existedGroupsIDs
        }
    })
}