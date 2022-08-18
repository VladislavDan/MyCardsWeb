import {FC} from "react";

import {RepeaterEditorComponent} from "./RepeaterEditorComponent";
import {IRepeaterEditorContainer} from "./types/IRepeaterEditorContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {initialState} from "./defaults/inititalState";
import {RepeaterEditorCallbackSettings} from "./types/RepeaterEditorCallbackSettings";

export const RepeaterEditorContainer: FC<IRepeaterEditorContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<RepeaterEditorCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {state, services: {repeaterEditorService}, context} = callbackSettings

    const saveRepeater = () => {
    }
    const select = () => {
    }

    return <RepeaterEditorComponent
        onSaveRepeater={saveRepeater}
        cardsGroups={state.cardsGroups}
        height={context.height}
        selectedGroups={state.selectedGroups}
        onSelect={select}
    />
}