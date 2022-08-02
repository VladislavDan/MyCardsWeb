import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";

export const onConstructor: ICallback<GoogleBackupCallbackSettings, string> = (
    {services: {googleBackupsService}}
) => {
    googleBackupsService.backupsNameLoadChannel.next('');
}