import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {CardViewerContainerState} from "./CardViewerContainerState";
import {ICardViewerContainer} from "./ICardViewerContainer";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";

export type CardViewerCallbackSettings = ICallbackSettings<CardViewerContainerState,
    ICardViewerContainer,
    INavigationState,
    IAppContext>