import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {CardsEditorComponent} from './CardsEditorComponent';
import {useConstructor} from '../../../MyTools/react-hooks/useConstructor';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {AppContext} from '../../../App';
import {onCardEditingChannel} from './channels-callbacks/onCardEditingChannel';
import {onCardChannel} from './channels-callbacks/onCardChannel';
import {onConstructor} from './ui-callbacks/onConstructor';
import {onChangeQuestion} from './ui-callbacks/onChangeQuestion';
import {onChangeAnswer} from './ui-callbacks/onChangeAnswer';
import {onSaveCard} from './ui-callbacks/onSaveCard';
import {initialState} from './defaults/initialState';
import {CardsEditorCallbackSettings} from './types/CardsEditorCallbackSettings';
import {useDependencyContext} from '../../../MyTools/react-di/hooks/useDependency';
import {CardsEditorService} from './CardsEditorService';
import {IDependenciesNames} from '../../common/types/IDependenciesNames';

export const CardsEditorContainer: FC = () => {

    const cardsEditorService = useDependencyContext<CardsEditorService>(IDependenciesNames.CardsEditorService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<CardsEditorCallbackSettings>(
        initialState,
        {cardsEditorService},
        AppContext
    );

    const {state} = externalCallbackSettings;

    useChannel(cardsEditorService.cardEditingChannel, callbackFactory(onCardEditingChannel));
    useChannel(cardsEditorService.cardChannel, callbackFactory(onCardChannel));

    useConstructor(callbackFactory(onConstructor));

    const changeQuestion = useCallback(callbackFactory(onChangeQuestion), []);
    const changeAnswer = useCallback(callbackFactory(onChangeAnswer), []);
    const saveCard = useCallback(callbackFactory(onSaveCard), []);

    return <CardsEditorComponent
        question={state.card.question}
        answer={state.card.answer}
        onChangeQuestion={changeQuestion}
        onChangeAnswer={changeAnswer}
        onSaveCard={saveCard}
    />
};
