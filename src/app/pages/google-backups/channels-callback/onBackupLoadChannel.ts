import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleBackupCallbackSettings} from "../types/GoogleBackupCallbackSettings";
import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const onBackupLoadChannel: ICallback<GoogleBackupCallbackSettings, ICardsGroup[]> = (
    {services: {spinnerService}}
) => {
    spinnerService.spinnerCounterChannel.next(-1);
}