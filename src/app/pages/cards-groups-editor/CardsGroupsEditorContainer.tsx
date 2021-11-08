import * as React from 'react';
import {FC, useState} from 'react';
import {useHistory, useLocation} from 'react-router';

import {useChannel} from '../../common/hooks/useChannel';
import {ICardsGroup} from '../../types/ICardsGroup';
import {CardsGroupsEditorService} from './CardsGroupsEditorService';
import {CardsGroupsEditorComponent} from './CardsGroupsEditorComponent';
import {INavigationState} from '../../types/INavigationState';
import {useConstructor} from '../../common/hooks/useConstructor';

export const CardsGroupsEditorContainer: FC<ICardsGroupsEditorContainer> = ({cardsGroupsEditorService}) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const [state, setState] = useState<CardsGroupsEditorState>({
        cardsGroup: {
            cards: [],
            nameCardsGroup: '',
            dateRepeating: new Date().getTime(),
            id: new Date().getTime(),
            percentRepeatedCards: 0
        }
    });

    useChannel<ICardsGroup, ICardsGroup[]>(cardsGroupsEditorService.groupEditingChannel);

    useChannel<number, ICardsGroup>(cardsGroupsEditorService.groupChannel, (cardsGroup: ICardsGroup) => {
        setState({
            cardsGroup
        })
    });

    useConstructor(() => {
        let cardsGroupID = location.state ? location.state.cardsGroupID : -1;
        cardsGroupsEditorService.groupChannel.next(cardsGroupID);
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
        cardsGroupsEditorService.groupEditingChannel.next(state.cardsGroup);
        history.goBack();
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
    cardsGroupsEditorService: CardsGroupsEditorService
}
