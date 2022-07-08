import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardsEditorCallbackSettings} from "../types/CardsEditorCallbackSettings";
import {ISimplifiedCardsGroup} from "../../../common/types/ISimplifiedCardsGroup";
import {defaultSimplifiedGroupValue} from "../../../common/Constants";

export const onSimplifiedCardsGroupsChannel: ICallback<CardsEditorCallbackSettings, {
    currentCardsGroup: ISimplifiedCardsGroup; cardsGroups: ISimplifiedCardsGroup[]
}> = (
    {history, setState, state},
    args = {
        currentCardsGroup: defaultSimplifiedGroupValue,
        cardsGroups: []
    }
) => {
    if (args.currentCardsGroup) {
        setState((prevState) => {
            return {
                ...prevState,
                ...args
            }
        })
    } else {
        setState((prevState) => {
            return {
                ...prevState,
                ...args,
                currentCardsGroup: state.currentCardsGroup
            }
        })
    }
}