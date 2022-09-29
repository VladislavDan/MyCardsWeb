import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {NavigationPanelCallbackSettings} from "../types/NavigationPanelCallbackSettings";
import {IEmpty} from "../../../../MyTools/channel-conception/defaults/IEmpty";

export const onNavigationPanelOpenChannel: ICallback<NavigationPanelCallbackSettings, IEmpty> = (
    {setState}
) => {
    setState((prevState) => {
        return {...prevState, isOpen: true}
    });
}