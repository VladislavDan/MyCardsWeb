import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {LocalBackupsCallbackSettings} from "../types/LocalBackupsCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onLoadBackupChannel: ICallback<LocalBackupsCallbackSettings, ICardsGroup[]> = (
    {services: {spinnerService}}
) => {
    spinnerService.spinnerCounterChannel.next(-1);
}