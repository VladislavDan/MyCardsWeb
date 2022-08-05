import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {NavigationPanelCallbackSettings} from "../types/NavigationPanelCallbackSettings";

export const onNavigationPanelOpenChannel: ICallback<NavigationPanelCallbackSettings, string> = (
    {setState}
) => {
    setState((prevState) => {
        return {...prevState, isOpen: true}
    });
}