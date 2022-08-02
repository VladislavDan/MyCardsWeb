import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";
import {Routs} from "../../../common/Routs";

export const onBackupLoadChannelError: ICallback<GoogleBackupCallbackSettings, Error> = (
    {history, services: {spinnerService}}
) => {
    spinnerService.spinnerCounterChannel.next(-1);
    history.replace(Routs.googleAuth.path);
}