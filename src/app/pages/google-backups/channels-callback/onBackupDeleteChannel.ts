import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";

export const onBackupDeleteChannel: ICallback<GoogleBackupCallbackSettings, string> = (
    {services: {googleBackupsService, spinnerService}}
) => {
    spinnerService.spinnerCounterChannel.next(-1);
    googleBackupsService.backupsNameLoadChannel.next('')
}