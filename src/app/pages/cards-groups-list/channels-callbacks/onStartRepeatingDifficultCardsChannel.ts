import {ICallback} from '../../../../MyTools/react-types/ICallback';
import {ICardsGroupsCallbackSettings} from '../types/ICardsGroupsCallbackSettings';
import {Routs} from '../../../common/Routs';

export const onStartRepeatingDifficultCardsChannel: ICallback<ICardsGroupsCallbackSettings, number[]> = (
    {
        history,
        location,
        services: {
            cardsGroupsListService
        },
    },
    cardsIDs = []
) => {
    history.push({
        pathname: Routs.cardsRepeater.path,
        state: {
            ...location.state,
            cardsIDsForRepeating: cardsIDs
        }
    })
}