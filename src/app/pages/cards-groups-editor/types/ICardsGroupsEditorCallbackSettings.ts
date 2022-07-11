import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {CardsGroupsEditorState} from "./CardsGroupsEditorState";
import {ICardsGroupsEditorContainer} from "./ICardsGroupsEditorContainer";

export type ICardsGroupsEditorCallbackSettings = ICallbackSettings<CardsGroupsEditorState,
    ICardsGroupsEditorContainer,
    INavigationState,
    IAppContext>