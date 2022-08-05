import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";

export const onSelectItem: ICallback<CardsCallbackSettings, number> = (
    settings,
    cardID = -1
) => {

    const {setState} = settings;

    setState((prevState) => {
        const selectedItems = {
            ...prevState.selectedItems
        };

        if (selectedItems[cardID]) {
            selectedItems[cardID] = !selectedItems[cardID]
        } else {
            selectedItems[cardID] = true
        }
        return {
            ...prevState,
            selectedItems
        }
    })
}