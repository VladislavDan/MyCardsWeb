import {map, tap} from 'rxjs/operators';

import {StorageService} from '../../common/services/StorageService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';
import {ICard} from '../../types/ICard';
import {IRangeOfKnowledge} from '../../types/IRangeOfKnowledge';
import {ISimplifiedCardsGroup} from '../../types/ISimplifiedCardsGroup';

export class CardsEditorService {

    public cardEditingChannel: Channel<{ card: ICard, cardsGroupID: number }, ICard>;
    public simplifiedCardsGroupsChannel: Channel<number, {currentCardsGroup: ISimplifiedCardsGroup | undefined, cardsGroups: ISimplifiedCardsGroup[]}>;
    public cardChannel: Channel<{ cardID: number, cardsGroupID: number }, ICard | undefined>;

    constructor(storageService: StorageService) {
        this.cardEditingChannel = new Channel(({card, cardsGroupID}) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => {
                const cardGroupIndex = cardsGroups.findIndex((cardGroup: ICardsGroup) => cardsGroupID === cardGroup.id);
                let cardIndex = -1;

                if(cardGroupIndex >=0) {
                    cardIndex = cardsGroups[cardGroupIndex].cards.findIndex((item: ICard) => card.id === item.id)
                }

                if (cardGroupIndex >= 0 && cardIndex < 0) {
                    cardsGroups[cardGroupIndex].cards.push(card);
                } else if(cardGroupIndex >= 0 && cardIndex >= 0) {
                    cardsGroups[cardGroupIndex].cards[cardIndex] = card;
                }

                return cardsGroups;
            }),
            tap((cardsGroups: ICardsGroup[]) => {
                storageService.setBackup(cardsGroups);
            }),
            map(() => card)
        ));

        this.cardChannel = new Channel(({cardID, cardsGroupID}) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => {

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
            })
        ));

        this.simplifiedCardsGroupsChannel = new Channel((cardsGroupID: number) => storageService.getBackup().pipe(
            map((cardsGroups: ICardsGroup[]) => {

                return cardsGroups.map((cardsGroup: ICardsGroup): ISimplifiedCardsGroup => {
                    return {
                        id: cardsGroup.id,
                        nameCardsGroup: cardsGroup.nameCardsGroup
                    }
                });
            }),
            map((cardsGroups: ISimplifiedCardsGroup[]) => {

                let currentCardsGroup = cardsGroups.find((cardGroup: ISimplifiedCardsGroup) => cardsGroupID === cardGroup.id);

                return {
                    currentCardsGroup,
                    cardsGroups
                }
            })
        ))
    }
}
