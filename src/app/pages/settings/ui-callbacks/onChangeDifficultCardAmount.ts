import {ICallback} from '../../../../MyTools/react-types/ICallback';
import {SettingsCallbackSettings} from '../types/SettingsCallbackSettings';

export const onChangeDifficultCardAmount: ICallback<SettingsCallbackSettings, number> = (
    {setState, services: {settingsService}},
    difficultCardsAmountForRepeating = 10
) => {
    setState((prevState) => {
        settingsService.changeSettingsChannel.next({
            ...prevState,
            difficultCardsAmountForRepeating
        })
        return prevState;
    })
}