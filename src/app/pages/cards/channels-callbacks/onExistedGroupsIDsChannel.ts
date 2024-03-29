import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";
import {CardsContainerState} from "../types/CardsContainerState";

export const onExistedGroupsIDsChannel: ICallback<CardsCallbackSettings, { id: number; label: string; }[]> = (
    {setState},
    existedGroupsIDs = []
) => {
    setState((prevState: CardsContainerState) => {
        return {
            ...prevState,
            existedGroupsIDs
        }
    })
}