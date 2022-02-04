import * as React from 'react';
import {FC, useState} from 'react';
import {useHistory, useLocation} from 'react-router';

import {useChannel} from '../../common/hooks/useChannel';
import {CardsEditorService} from './CardsEditorService';
import {CardsEditorComponent} from './CardsEditorComponent';
import {INavigationState} from '../../types/INavigationState';
import {useConstructor} from '../../common/hooks/useConstructor';
import {ICard} from '../../types/ICard';
import {ISimplifiedCardsGroup} from '../../types/ISimplifiedCardsGroup';
import {initialCard} from '../../common/Constants';

export const CardsEditorContainer: FC<ICardsGroupsEditorContainer> = ({cardsEditorService}) => {

    const location = useLocation<INavigationState>();

    const history = useHistory();

    const [state, setState] = useState<CardsGroupsEditorState>({
        card: initialCard,
        currentCardsGroup: {
            id: 0,
            nameCardsGroup: ''
        },
        cardsGroups: []
    });

    useChannel<{ card: ICard, cardsGroupID: number }, ICard>(cardsEditorService.cardEditingChannel, () => {
        history.goBack();
    });

    useChannel<number, { currentCardsGroup: ISimplifiedCardsGroup | undefined, cardsGroups: ISimplifiedCardsGroup[] }>(
        cardsEditorService.simplifiedCardsGroupsChannel,
        ({currentCardsGroup, cardsGroups}) => {
            if (currentCardsGroup) {
                setState((prevState) => { return  {
                    ...prevState,
                    cardsGroups,
                    currentCardsGroup
                }})
            } else {
                setState((newState) =>{ return  {
                    ...newState,
                    currentCardsGroup: state.currentCardsGroup,
                    cardsGroups
                }})
            }
        }
    );

    useChannel<{ cardID: number, cardsGroupID: number }, ICard | undefined>(cardsEditorService.cardChannel, (card: ICard | undefined) => {
        if (card) {
            setState({
                ...state,
                card
            })
        }
    });

    useConstructor(() => {
        let cardsGroupID = location.state ? location.state.cardsGroupID : -1;
        let cardID = location.state ? location.state.cardID : -1;
        cardsEditorService.cardChannel.next({cardID, cardsGroupID});

        cardsEditorService.simplifiedCardsGroupsChannel.next(cardsGroupID);
    });

    const onChangeQuestion = (question: string) => {
        setState({
            card: {
                ...state.card,
                question
            },
            currentCardsGroup: state.currentCardsGroup,
            cardsGroups: state.cardsGroups
        })
    };

    const onChangeAnswer = (answer: string) => {
        setState({
            card: {
                ...state.card,
                answer
            },
            currentCardsGroup: state.currentCardsGroup,
            cardsGroups: state.cardsGroups
        })
    };

    const onChangeCardsGroup = (cardsGroupID: number) => {
        cardsEditorService.simplifiedCardsGroupsChannel.next(cardsGroupID);
    };

    const onSaveCard = () => {
        cardsEditorService.cardEditingChannel.next({card: state.card, cardsGroupID: state.currentCardsGroup.id});
    };

    return <CardsEditorComponent
        question={state.card.question}
        answer={state.card.answer}
        onChangeQuestion={onChangeQuestion}
        onChangeAnswer={onChangeAnswer}
        onSaveCard={onSaveCard}
        currentCardsGroup={state.currentCardsGroup}
        cardsGroups={state.cardsGroups}
        onChangeCardsGroup={onChangeCardsGroup}
    />
};

interface CardsGroupsEditorState {
    card: ICard;
    currentCardsGroup: ISimplifiedCardsGroup;
    cardsGroups: ISimplifiedCardsGroup[];
}

interface ICardsGroupsEditorContainer {
    cardsEditorService: CardsEditorService
}
