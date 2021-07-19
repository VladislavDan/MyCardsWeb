import {BaseManager} from '../base-screen/BaseManager'
import {Subject} from 'rxjs'
import {map} from 'rxjs/operators'
import {MMKV} from 'react-native-mmkv'
import {APP_STORAGE_KEY} from '../../common/Constants'
import {AppState} from '../../types/AppState'
import * as _ from 'lodash'
import {CardsGroup} from '../../types/screens/cards-screen/CardsGroup'

export class ChangeCardsGroupManager implements BaseManager {

    public initializeNewCardsGroupsChannel: Subject<number> = new Subject();
    public nameCardsGroupChannel: Subject<string> = new Subject();
    public errorChannel: Subject<any> = new Subject();
    public createCardsGroupChannel: Subject<CardsGroup> = new Subject();
    public changeCardsGroupChannel: Subject<number> = new Subject();
    public deleteCardsGroupChannel: Subject<number> = new Subject();

    constructor() {
        this.initializeNewCardsGroupsChannel.pipe(
            map((cardsGroupId: number) => {
                let result: AppState = JSON.parse(MMKV.getString(APP_STORAGE_KEY));
                let index: number = _.findIndex(result.cardsGroups, (cardsTeam: CardsGroup) => {
                    return cardsTeam.dateCreating === cardsGroupId;
                });
                return result.cardsGroups[index].nameCardsGroup;
            })
        ).subscribe(
            ( nameCardsGroup: string ) => {
                this.nameCardsGroupChannel.next(nameCardsGroup);
            },
            (error) => {
                this.errorChannel.next(error)
            }
        )
    }

    destroy(): void {
        this.initializeNewCardsGroupsChannel.unsubscribe();
        this.nameCardsGroupChannel.unsubscribe();
        this.errorChannel.unsubscribe();
        this.createCardsGroupChannel.unsubscribe();
        this.changeCardsGroupChannel.unsubscribe();
        this.deleteCardsGroupChannel.unsubscribe();
    }
}
