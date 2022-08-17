import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onBackupDeleteChannel: ICallback<GoogleBackupCallbackSettings, string> = (
    {services: {googleBackupsService, spinnerService}}
) => {
    spinnerService.spinnerCounterChannel.next(-1);
    googleBackupsService.backupsNameLoadChannel.next(empty)
}