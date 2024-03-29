import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onBackupUploadChannel: ICallback<GoogleBackupCallbackSettings, string> = (
    {services: {spinnerService, googleBackupsService}}
) => {
    googleBackupsService.backupsNameLoadChannel.next(empty)
    spinnerService.spinnerCounterChannel.next(-1);
}