import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleAuthCallbackSettings} from "../types/GoogleAuthCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onLoginChannel: ICallback<GoogleAuthCallbackSettings, string> = (
    {history}
) => {
    history.replace(Routs.googleBackups.path);
}