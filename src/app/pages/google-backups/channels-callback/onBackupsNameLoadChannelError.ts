import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {Routs} from "../../../common/Routs";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";

export const onBackupsNameLoadChannelError: ICallback<GoogleBackupCallbackSettings, Error> = (
    {history, services: {spinnerService}}
) => {
    spinnerService.spinnerCounterChannel.next(-1);
    history.replace(Routs.googleAuth.path);
}