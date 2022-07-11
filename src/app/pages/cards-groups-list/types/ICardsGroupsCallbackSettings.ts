import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {ICardsGroupsListContainer} from "./ICardsGroupsListContainer";
import {CardsGroupsListContainerState} from "./CardsGroupsListContainerState";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";

export type ICardsGroupsCallbackSettings = ICallbackSettings<CardsGroupsListContainerState,
    ICardsGroupsListContainer,
    INavigationState,
    IAppContext>