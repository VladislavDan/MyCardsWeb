import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsContainerCallbackSettings} from "../types/CardsContainerCallbackSettings";

export const onStartSelecting: ICallback<CardsContainerCallbackSettings, void> = (
    {setState}
) => {
    setState((prevState) => {
        return {
            ...prevState,
            isEnabledSelecting: !prevState.isEnabledSelecting,
            selectedItems: !prevState.isEnabledSelecting ? {} : prevState.selectedItems
        }
    })
}