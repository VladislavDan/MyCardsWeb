import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onSelectItem: ICallback<CardsContainerCallbackSettings, number> = (
    settings,
    cardID = -1
) => {

    const {state, setState} = settings;

    const selectedItems = {
        ...state.selectedItems
    };

    if (selectedItems[cardID]) {
        selectedItems[cardID] = !selectedItems[cardID]
    } else {
        selectedItems[cardID] = true
    }

    setState((prevState) => {
        return {
        ...prevState,
            selectedItems
        }
    })
}