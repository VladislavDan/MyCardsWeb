import {FC, useCallback} from "react";

import {RepeaterListComponent} from "./RepeaterListComponent";
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
import {useDependency} from "../../../MyTools/react-di/hooks/useDependency";
import {RepeaterListService} from "./RepeaterListService";
import {ConfirmDialogService} from "../../parts/confirm-dialog/ConfirmDialogService";

export const RepeaterListContainer: FC = () => {

    const repeaterListService = useDependency(RepeaterListService);
    const confirmDialogService = useDependency(ConfirmDialogService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<RepeaterListCallbackSettings>(
        initialState,
        {repeaterListService, confirmDialogService},
        AppContext
    );

    const {state, context} = externalCallbackSettings

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