import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardsCallbackSettings} from "../types/CardsCallbackSettings";

export const onStartSelecting: ICallback<CardsCallbackSettings, void> = (
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