import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";
import {empty} from "../../../../MyTools/channel-conception/defaults/empty";

export const onConstructor: ICallback<GoogleBackupCallbackSettings, string> = (
    {services: {googleBackupsService}}
) => {
    googleBackupsService.backupsNameLoadChannel.next(empty);
}