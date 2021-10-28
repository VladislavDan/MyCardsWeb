import * as React from 'react';
import {FC, useState} from 'react';
import {useLocation} from 'react-router';

import {useChannel} from '../../common/hooks/useChannel';
import {ICardsGroup} from '../../types/ICardsGroup';
import {CardsGroupsEditorService} from './CardsGroupsEditorService';
import {CardsGroupsEditorComponent} from './CardsGroupsEditorComponent';
import {INavigationState} from '../../types/INavigationState';
import {useConstructor} from '../../common/hooks/useConstructor';

export const CardsGroupsEditorContainer: FC<ICardsGroupsEditorContainer> = ({service}) => {

    const location = useLocation<INavigationState>();

    const [state, setState] = useState<CardsGroupsEditorState>({
        cardsGroup: {
            cards: [],
            nameCardsGroup: '',
            dateRepeating: new Date().getTime(),
            id: new Date().getTime(),
            percentRepeatedCards: 0
        }
    });

    useChannel<ICardsGroup, ICardsGroup[]>(service.groupEditingChannel);

    useChannel<number, ICardsGroup>(service.groupChannel, (cardsGroup: ICardsGroup) => {
        setState({
            cardsGroup
        })
    });

    useConstructor(() => {
        service.groupChannel.next(location.state.cardsGroupID);
    });

    const onChangeGroupName = (groupName: string) => {
        setState({
            cardsGroup: {
                ...state.cardsGroup,
                nameCardsGroup: groupName
            }
        })
    };

    const onSaveGroup = () => {
        service.groupEditingChannel.next(state.cardsGroup);
    };

    return <CardsGroupsEditorComponent
        groupName={state.cardsGroup.nameCardsGroup}
        onChangeGroupName={onChangeGroupName}
        onSaveGroup={onSaveGroup}
    />
};

interface CardsGroupsEditorState {
    cardsGroup: ICardsGroup
}

interface ICardsGroupsEditorContainer {
    service: CardsGroupsEditorService
}
