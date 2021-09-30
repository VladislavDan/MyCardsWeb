import {of} from 'rxjs';

import {localStorageService} from '../../common/services/LocalStoragService';
import {ICardsGroup} from '../../types/ICardsGroup';
import {Channel} from '../../common/Channel';
import {switchMap, tap} from 'rxjs/operators';

class CardsGroupsEditorService {

}

export const cardsGroupsEditorService= new CardsGroupsEditorService();
