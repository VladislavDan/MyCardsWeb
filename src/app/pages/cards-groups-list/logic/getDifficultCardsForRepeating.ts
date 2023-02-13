import {ICardsGroup} from '../../../common/types/ICardsGroup';
import {ISettings} from '../../../common/types/ISettings';
import {IStatistic} from '../../../common/types/IStatistic';

export const getDifficultCardsForRepeating = (
    cardsGroups: ICardsGroup[],
    settings: ISettings,
    statistic: IStatistic,
    cardsGroupId: number
) => {
    const cardsInProgress = new Map(Object.entries(statistic.cardsInProgressFrequency)
        .filter((a) => {
            const cardsGroupIndex = cardsGroups.findIndex((cardsGroup) => cardsGroup.id === cardsGroupId);
            const group = cardsGroups[cardsGroupIndex];
            const cardIndex = group.cards.findIndex((card) => card.id === Number(a[0]));
            return cardIndex >= 0;
        })
        .sort((a, b) => {
            if (a[1] > b[1]) {
                return -1;
            } else if (a[1] < b[1]) {
                return 1;
            } else {
                return 0
            }
        })
    );

    const cardsForRepeating: number[] = [];
    [...cardsInProgress.entries()].forEach((item) => {
        if (cardsForRepeating.length <= settings.difficultCardsAmountForRepeating - 1) {
            cardsForRepeating.push(Number(item[0]));
        }
    });

    return cardsForRepeating;
}