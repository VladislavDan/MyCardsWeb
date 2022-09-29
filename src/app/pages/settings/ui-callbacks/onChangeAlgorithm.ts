import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {SettingsCallbackSettings} from "../types/SettingsCallbackSettings";
import {IRepeatingType} from "../../../common/types/IRepeatingType";

export const onChangeAlgorithm: ICallback<SettingsCallbackSettings, IRepeatingType> = (
    {setState, services: {settingsService}},
    repeatingType = IRepeatingType.DEFAULT
) => {
    setState((prevState) => {
        settingsService.changeSettingsChannel.next({
            ...prevState,
            repeatingType
        })
        return prevState;
    })
}