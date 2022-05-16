import {ICardsGroup} from '../../../common/types/ICardsGroup';
import {ICard} from '../../../common/types/ICard';
import {IRangeOfKnowledge} from '../../../common/types/IRangeOfKnowledge';

export const getEditingCard = (cardsGroupID: number, cardID: number, cardsGroups: ICardsGroup[]) => {

        let cardsGroup = cardsGroups.find((cardGroup: ICardsGroup) => cardsGroupID === cardGroup.id);
        let card: ICard | undefined = {
            rangeOfKnowledge: IRangeOfKnowledge.TO_DO,
            answer: '',
            question: '',
            dateRepeating: 0,
            id: new Date().getTime()
        };

        if (cardsGroup) {
            card = cardsGroup.cards.find((card: ICard) => card.id === cardID)
        }

        return card;
};
