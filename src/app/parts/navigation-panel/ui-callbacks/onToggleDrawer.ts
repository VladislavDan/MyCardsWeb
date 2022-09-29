import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {NavigationPanelCallbackSettings} from "../types/NavigationPanelCallbackSettings";
import {SyntheticEvent} from "react";

export const onToggleDrawer: ICallback<NavigationPanelCallbackSettings, SyntheticEvent<Element, Event>> = (
    {setState},
    event
) => {
    const keyboardEvent = event && event.nativeEvent as KeyboardEvent
    if (event && event.type === 'keydown' && (keyboardEvent?.key === 'Tab' || keyboardEvent?.key === 'Shift')) {
        return;
    }

    setState((prevState) => {
        return {...prevState, isOpen: !prevState.isOpen}
    });
}