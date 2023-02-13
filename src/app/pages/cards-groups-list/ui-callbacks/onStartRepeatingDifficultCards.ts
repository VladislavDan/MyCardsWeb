import {ICallback} from '../../../../MyTools/react-types/ICallback';
import {ICardsGroupsCallbackSettings} from '../types/ICardsGroupsCallbackSettings';

export const onStartRepeatingDifficultCards: ICallback<ICardsGroupsCallbackSettings, number> = (
    {services: {cardsGroupsListService}},
    cardsGroupId = -1
) => {
    cardsGroupsListService.startRepeatingDifficultCardsChannel.next(cardsGroupId);
}