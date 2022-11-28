import {Channel} from 'src/MyTools/channel-conception/Channel';
import {ICard} from 'src/app/common/types';
import {IRepeatingArgs} from 'src/app/common/types/IRepeatingArgs';
import {ICardsGroup} from 'src/app/common/types/ICardsGroup';
import {IDependency} from 'src/MyTools/react-di/types/IDependency';

export interface ICardViewerService extends IDependency {
    cardChannel: Channel<number, ICard>;
    repeatingResultChannel: Channel<IRepeatingArgs, ICardsGroup[]>;
    cardGroupNameChannel: Channel<number, string>;
    readByVoiceEngineChannel: Channel<string, string>;
    deleteSingleCardChannel: Channel<number, ICardsGroup[]>;
}