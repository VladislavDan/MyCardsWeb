import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";

export const onBackupUploadChannel: ICallback<GoogleBackupCallbackSettings, string> = (
    {services: {spinnerService, googleBackupsService}}
) => {
    googleBackupsService.backupsNameLoadChannel.next('')
    spinnerService.spinnerCounterChannel.next(-1);
}