import {ICallback} from '../../../../MyTools/react-types/ICallback';
import {ToolbarCallbackSettings} from '../types/ToolbarCallbackSettings';

export const onCardsCountInGroupChannel: ICallback<ToolbarCallbackSettings, number> = (
    {setState},
    cardsCount = -1
) => {
    setState((prevState) => {
        return {
            ...prevState,
            cardsCount
        }
    })
}