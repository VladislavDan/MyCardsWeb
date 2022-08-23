import {FC, useCallback} from "react";

import {RepeaterListComponent} from "./RepeaterListComponent";
import {IRepeaterListContainer} from "./types/IRepeaterListContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {RepeaterListCallbackSettings} from "./types/RepeaterListCallbackSettings";
import {initialState} from "./defaults/initialState";
import {onOpenEditor} from "./ui-callbacks/onOpenEditor";
import {useChannel} from "../../../MyTools/channel-conception/react-hooks/useChannel";
import {onRepeaterListChannel} from "./channels-callbacks/onRepeaterListChannel";
import {useConstructor} from "../../../MyTools/react-hooks/useConstructor";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onStartRepeatingChannel} from "./channels-callbacks/onStartRepeatingChannel";
import {onStartRepeating} from "./ui-callbacks/onStartRepeating";
import {onRemoveRepeater} from "./ui-callbacks/onRemoveRepeater";
import {onResetProgressChannel} from "./channels-callbacks/onResetProgressChannel";
import {onResetProgress} from "./ui-callbacks/onResetProgress";
import {onEditRepeater} from "./ui-callbacks/onEditRepeater";

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

    useChannel(repeaterListService.repeaterListChannel, callbackFactory(onRepeaterListChannel));
    useChannel(repeaterListService.startRepeatingChannel, callbackFactory(onStartRepeatingChannel));
    useChannel(repeaterListService.removingRepeaterChannel, callbackFactory(onRepeaterListChannel));
    useChannel(repeaterListService.resetProgressChannel, callbackFactory(onResetProgressChannel));

    useConstructor(callbackFactory(onConstructor));

    const openEditor = useCallback(callbackFactory(onOpenEditor), []);
    const startRepeating = useCallback(callbackFactory(onStartRepeating), []);
    const removeRepeater = useCallback(callbackFactory(onRemoveRepeater), []);
    const resetProgress = useCallback(callbackFactory(onResetProgress), []);
    const editRepeater = useCallback(callbackFactory(onEditRepeater), []);

    return <RepeaterListComponent
        repeaters={state.repeaters}
        height={context.height}
        onOpenEditor={openEditor}
        onDeleteRepeater={removeRepeater}
        onStartRepeating={startRepeating}
        onResetProgress={resetProgress}
        onEditRepeater={editRepeater}
    />
}