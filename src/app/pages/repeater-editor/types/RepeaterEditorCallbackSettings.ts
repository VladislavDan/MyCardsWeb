import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {RepeaterEditorState} from "./RepeaterEditorState";
import {IRepeaterEditorContainer} from "./IRepeaterEditorContainer";
import {IAppContext} from "../../../common/types/IAppContext";

export type RepeaterEditorCallbackSettings = ICallbackSettings<RepeaterEditorState,
    IRepeaterEditorContainer,
    INavigationState,
    IAppContext>