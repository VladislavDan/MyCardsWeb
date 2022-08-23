import {FC, useCallback} from "react";

import {RepeaterEditorComponent} from "./RepeaterEditorComponent";
import {IRepeaterEditorContainer} from "./types/IRepeaterEditorContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {AppContext} from "../../../App";
import {initialState} from "./defaults/inititalState";
import {RepeaterEditorCallbackSettings} from "./types/RepeaterEditorCallbackSettings";
import {useChannel} from "../../../MyTools/channel-conception/react-hooks/useChannel";
import {onGroupsListChannel} from "./channels-callbacks/onGroupsListChannel";
import {onSaveRepeaterChannel} from "./channels-callbacks/onSaveRepeaterChannel";
import {onSaveRepeater} from "./ui-callbacks/onSaveRepeater";
import {onUpdateGroupsIDsChannel} from "./channels-callbacks/onUpdateGroupsIDsChannel";
import {onSelect} from "./ui-callbacks/onSelect";
import {onRepeaterChannel} from "./channels-callbacks/onRepeaterChannel";
import {onChangeName} from "./ui-callbacks/onChangeName";
import {useConstructor} from "../../../MyTools/react-hooks/useConstructor";
import {onConstructor} from "./ui-callbacks/onConstructor";
import {onSelectedGroupsChannel} from "./channels-callbacks/onSelectedGroupsChannel";

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

    useChannel(repeaterEditorService.groupsListChannel, callbackFactory(onGroupsListChannel));
    useChannel(repeaterEditorService.saveRepeaterChannel, callbackFactory(onSaveRepeaterChannel));
    useChannel(repeaterEditorService.updateGroupsIDsChannel, callbackFactory(onUpdateGroupsIDsChannel));
    useChannel(repeaterEditorService.repeaterChannel, callbackFactory(onRepeaterChannel));
    useChannel(repeaterEditorService.selectedGroupsChannel, callbackFactory(onSelectedGroupsChannel));

    useConstructor(callbackFactory(onConstructor));

    const saveRepeater = useCallback(callbackFactory(onSaveRepeater), []);
    const select = useCallback(callbackFactory(onSelect), []);
    const changeName = useCallback(callbackFactory(onChangeName), []);

    return <RepeaterEditorComponent
        onSaveRepeater={saveRepeater}
        cardsGroups={state.cardsGroups}
        height={context.height}
        selectedGroups={state.selectedGroups}
        onSelect={select}
        onChangeName={changeName}
        repeaterName={state.repeater.name}
    />
}