import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";
import {IGoogleDriveFile} from "../../../common/types/IGoogleDriveFile";

export const onBackupsNameLoadChannel: ICallback<GoogleBackupCallbackSettings, IGoogleDriveFile[]> = (
    {setState, services: {spinnerService}},
    backupsFiles = []
) => {
    setState((prevState) => {
        return {...prevState, backupsFiles}
    });
    spinnerService.spinnerCounterChannel.next(-1);
}