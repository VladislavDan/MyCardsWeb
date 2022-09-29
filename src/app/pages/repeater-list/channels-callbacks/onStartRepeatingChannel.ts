import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {RepeaterListCallbackSettings} from "../types/RepeaterListCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onStartRepeatingChannel: ICallback<RepeaterListCallbackSettings, number[]> = (
    {setState, history, location},
    cardsIDs = []
) => {
    history.push({
        pathname: Routs.cardsRepeater.path,
        state: {
            ...location.state,
            cardsIDsForRepeating: cardsIDs
        }
    })
}