import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {LocalBackupsCallbackSettings} from "../types/LocalBackupsCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onLoadBackupChannel: ICallback<LocalBackupsCallbackSettings, ICardsGroup[]> = (
    {services: {spinnerService}}
) => {
    spinnerService.spinnerCounterChannel.next(-1);
}