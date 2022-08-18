import {FC} from "react";

import {RepeaterListComponent} from "./RepeaterListComponent";
import {IRepeaterListContainer} from "./types/IRepeaterListContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {RepeaterListCallbackSettings} from "./types/RepeaterListCallbackSettings";
import {initialState} from "./defaults/initialState";
import {onOpenEditor} from "./ui-callbacks/onOpenEditor";

export const RepeaterListContainer: FC<IRepeaterListContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<RepeaterListCallbackSettings>(
        initialState,
        services,
        AppContext
    );

    const {state, services: {repeaterListService}, context} = callbackSettings

    const openEditor = callbackFactory(onOpenEditor)

    return <RepeaterListComponent
        repeaters={state.repeaters}
        height={context.height}
        onOpenEditor={openEditor}
    />
}