import React, {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {CardsRepeaterComponent} from './CardsRepeaterComponent';
import {AppContext} from '../../../App';
import {onDeleteCard} from './ui-callbacks/onDeleteCard';
import {onDeleteSingleCardChannel} from './channels-callbacks/onDeleteSingleCardChannel';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {onCardChannel} from './channels-callbacks/onCardChannel';
import {onCardEditingChannel} from './channels-callbacks/onCardEditingChannel';
import {onStatisticChannel} from './channels-callbacks/onStatisticChannel';
import {onRepeatingResultChannel} from './channels-callbacks/onRepeatingResultChannel';
import {onConstructor} from './ui-callbacks/onConstructor';
import {onClick} from './ui-callbacks/onClick';
import {onClickCard} from './ui-callbacks/onClickCard';
import {onBackClick} from './ui-callbacks/onBackClick';
import {onSwitchEditing} from './ui-callbacks/onSwitchEditing';
import {onChangeQuestion} from './ui-callbacks/onChangeQuestion';
import {onChangeAnswer} from './ui-callbacks/onChangeAnswer';
import {initialState} from './defaults/initialState';
import {CardRepeaterCallbackSettings} from './types/CardRepeaterCallbackSettings';
import {onReadByVoiceEngine} from './ui-callbacks/onReadByVoiceEngine';
import {onReadByVoiceEngineChannel} from './channels-callbacks/onReadByVoiceEngineChannel';
import {useDependencyContext} from '../../../MyTools/react-di/hooks/useDependency';
import {CardsRepeaterService} from './CardsRepeaterService';
import {ConfirmDialogService} from '../../parts/confirm-dialog/ConfirmDialogService';
import {CardsEditorService} from '../cards-editor/CardsEditorService';
import {ToolbarService} from '../../parts/toolbar/ToolbarService';
import {IDependenciesNames} from '../../common/types/IDependenciesNames';

export const CardRepeaterContainer: FC = () => {

    const cardsRepeaterService = useDependencyContext<CardsRepeaterService>(IDependenciesNames.CardsRepeaterService);
    const cardsEditorService = useDependencyContext<CardsEditorService>(IDependenciesNames.CardsEditorService);
    const confirmDialogService = useDependencyContext<ConfirmDialogService>(IDependenciesNames.ConfirmDialogService);
    const toolbarService = useDependencyContext<ToolbarService>(IDependenciesNames.ToolbarService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<CardRepeaterCallbackSettings>(
        initialState,
        {
            cardsRepeaterService,
            cardsEditorService,
            confirmDialogService,
            toolbarService
        },
        AppContext
    );

    const {state, context} = externalCallbackSettings;

    useChannel(cardsRepeaterService.deleteSingleCardChannel, callbackFactory(onDeleteSingleCardChannel))
    useChannel(cardsRepeaterService.cardChannel, callbackFactory(onCardChannel));
    useChannel(cardsEditorService.cardEditingChannel, callbackFactory(onCardEditingChannel));
    useChannel(cardsRepeaterService.repeatingProgressChannel, callbackFactory(onStatisticChannel));
    useChannel(cardsRepeaterService.repeatingResultChannel, callbackFactory(onRepeatingResultChannel));
    useChannel(cardsRepeaterService.readByVoiceEngineChannel, callbackFactory(onReadByVoiceEngineChannel))

    useConstructor(callbackFactory(onConstructor));

    const click = useCallback(callbackFactory(onClick), []);
    const clickCard = useCallback(callbackFactory(onClickCard), []);
    const backClick = useCallback(callbackFactory(onBackClick), []);
    const switchEditing = useCallback(callbackFactory(onSwitchEditing), []);
    const changeQuestion = useCallback(callbackFactory(onChangeQuestion), []);
    const changeAnswer = useCallback(callbackFactory(onChangeAnswer), []);
    const deleteCard = useCallback(callbackFactory(onDeleteCard), [])
    const readByVoiceEngine = useCallback(callbackFactory(onReadByVoiceEngine), []);

    return <CardsRepeaterComponent
        onReadByVoiceEngine={readByVoiceEngine}
        onDeleteCard={deleteCard}
        cardHeight={context.height * 0.55}
        isQuestionSide={state.isQuestionSide}
        onClickCard={clickCard}
        onClickYesNoButton={click}
        card={state.card}
        repeatingProgress={state.repeatingProgress}
        onBackClick={backClick}
        onSwitchEditing={switchEditing}
        isEditable={state.isEditable}
        onChangeQuestion={changeQuestion}
        onChangeAnswer={changeAnswer}
    />
};
