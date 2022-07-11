import React, {FC, useCallback, useContext} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {ICard} from '../../common/types/ICard';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {CardsRepeaterComponent} from './CardsRepeaterComponent';
import {Routs} from '../../common/Routs';
import {IRepeatingArgs} from '../../common/types/IRepeatingArgs';
import {ICardsGroup} from '../../common/types/ICardsGroup';
import {IStatistic} from '../../common/types/IStatistic';
import {INavigationState} from '../../common/types/INavigationState';
import {AppContext} from '../../../App';
import {IAppContext} from '../../common/types/IAppContext';
import {initDefaultCard} from "../../common/logic/initDefaultCard";
import {IRangeOfKnowledge} from "../../common/types/IRangeOfKnowledge";
import {ICardRepeaterContainer} from "./types/ICardRepeaterContainer";
import {CardRepeaterContainerState} from "./types/CardRepeaterContainerState";
import {onDeleteCard} from "./ui-callbacks/onDeleteCard";
import {onDeleteSingleCardChannel} from "./channels-callbacks/onDeleteSingleCardChannel";
import {onCardGroupNameChannel} from "./channels-callbacks/onCardGroupNameChannel";
import {initialState} from "./Constants";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";

export const CardRepeaterContainer: FC<ICardRepeaterContainer> = (
    services
) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<INavigationState, CardRepeaterContainerState, ICardRepeaterContainer, IAppContext>(
        initialState,
        services,
        AppContext
    );

    const {
        state, setState, location, history, services: {
            cardsRepeaterService, cardsEditorService
        }
    } = callbackSettings

    useChannel(cardsRepeaterService.deleteSingleCardChannel, callbackFactory(onDeleteSingleCardChannel))
    useChannel(cardsRepeaterService.cardGroupNameChannel, callbackFactory(onCardGroupNameChannel))

    useChannel<number[], ICard>(cardsRepeaterService.cardChannel, (card: ICard) => {
        cardsRepeaterService.cardGroupNameChannel.next(card.id)
        setState((prevState) => {
            return {
                ...prevState,
                card: card,
                isQuestionSide: true,
                isEditable: false
            }
        });
        cardsRepeaterService.statisticChannel.next('');
    });

    useChannel<{ card: ICard, cardsGroupID: number }, ICard>(cardsEditorService.cardEditingChannel, (card: ICard) => {
        setState((prevState) => {
            return {
                ...prevState,
                card: card
            }
        });
    });

    useChannel<string, IStatistic>(cardsRepeaterService.statisticChannel, (statistic: IStatistic) => {
        setState((prevState) => {
            return {
                ...prevState,
                statistic
            }
        })
    });

    useChannel<IRepeatingArgs, ICardsGroup[]>(cardsRepeaterService.repeatingResultChannel, () => {
        cardsRepeaterService.cardChannel.next(location.state.cardsIDsForRepeating);
    });

    useConstructor(() => {
        if (location.state) {
            cardsRepeaterService.cardChannel.next(location.state.cardsIDsForRepeating);
        }
        cardsRepeaterService.statisticChannel.next('');
    });

    const value = useContext<IAppContext>(AppContext);

    const onClick = (isKnown: boolean) => {

        if (state.card) {
            cardsRepeaterService.repeatingResultChannel.next({
                isKnown: isKnown,
                cardID: state.card.id,
                cardsGroupID: location.state.cardsGroupID
            });
        } else {
            setState((prevState) => {
                return {
                    ...prevState,
                    card: {
                        id: -1,
                        question: '',
                        answer: '',
                        rangeOfKnowledge: IRangeOfKnowledge.IN_PROGRESS,
                        dateRepeating: 0
                    },
                    isQuestionSide: false,
                    isEditable: false
                }
            });
        }
    };

    const onClickCard = () => {
        if (!state.isEditable) {
            setState((prevState) => {
                return {
                    ...prevState,
                    isQuestionSide: !prevState.isQuestionSide
                }
            })
        }
    };

    const onBackClick = () => {
        history.replace(Routs.cardsGroups.path);
    };

    const onSwitchEditing = () => {
        setState((prevState) => {
            return {
                ...prevState,
                isEditable: !prevState.isEditable
            }
        });

        if (state.isEditable) {
            cardsEditorService.cardEditingChannel.next({
                card: state.card || initDefaultCard(),
                cardsGroupID: location.state.cardsGroupID
            })
        }
    };

    const onChangeQuestion = (question: string) => {
        if (state.card) {
            const editableCard = {
                ...state.card,
                question
            };

            setState((prevState) => {
                return {...prevState, card: editableCard}
            });
        }
    };

    const onChangeAnswer = (answer: string) => {
        if (state.card) {
            const editableCard = {
                ...state.card,
                answer
            };

            setState((prevState) => {
                return {...prevState, card: editableCard}
            });
        }
    };

    const deleteCard = useCallback(callbackFactory(onDeleteCard), [state.card])

    return <CardsRepeaterComponent
        onDeleteCard={deleteCard}
        cardHeight={value.height * 0.55}
        isQuestionSide={state.isQuestionSide}
        onClickCard={onClickCard}
        onClickYesNoButton={onClick}
        card={state.card}
        statistic={state.statistic}
        onBackClick={onBackClick}
        onSwitchEditing={onSwitchEditing}
        isEditable={state.isEditable}
        onChangeQuestion={onChangeQuestion}
        onChangeAnswer={onChangeAnswer}
    />
};
