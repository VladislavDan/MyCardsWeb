import {ICallbackSettings} from "../../../../MyTools/react-hooks/types/ICallbackSettings";
import {CardsContainerState} from "./CardsContainerState";
import {ICardsContainer} from "./ICardsContainer";
import {INavigationState} from "../../../common/types/INavigationState";
import {IAppContext} from "../../../common/types/IAppContext";

export type CardsContainerCallbackSettings = ICallbackSettings<CardsContainerState,
    ICardsContainer,
    INavigationState,
    IAppContext>