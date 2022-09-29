import {ICallbackSettings} from "../../../../MyTools/react-types/ICallbackSettings";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";
import {CardsEditorState} from "./CardsEditorState";
import {ICardsEditorContainer} from "./ICardsEditorContainer";

export type CardsEditorCallbackSettings = ICallbackSettings<CardsEditorState,
    ICardsEditorContainer,
    INavigationState,
    IAppContext>