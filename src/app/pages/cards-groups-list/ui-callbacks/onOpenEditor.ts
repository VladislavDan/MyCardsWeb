import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {ICardsGroupsCallbackSettings} from "../types/ICardsGroupsCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onOpenEditor: ICallback<ICardsGroupsCallbackSettings, void> = (
    {history}
) => {
    history.push({
        pathname: Routs.cardsGroupEditor.path
    })
}