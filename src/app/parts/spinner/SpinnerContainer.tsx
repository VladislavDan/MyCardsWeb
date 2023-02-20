import * as React from 'react';
import {FC} from 'react';

import {SpinnerComponent} from './SpinnerComponent';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {AppContext} from '../../../App';
import {SpinnerCallbackSettings} from './types/SpinnerCallbackSettings';
import {onSpinnerCounterChannel} from './channels-callbacks/onSpinnerCounterChannel';
import {useDependencyContext} from '../../../MyTools/react-di/hooks/useDependency';
import {SpinnerService} from './SpinnerService';
import {IDependenciesNames} from '../../common/types/IDependenciesNames';

export const SpinnerContainer: FC = () => {

    const spinnerService = useDependencyContext<SpinnerService>(IDependenciesNames.SpinnerService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<SpinnerCallbackSettings>(
        false,
        {spinnerService},
        AppContext
    );

    const {state} = externalCallbackSettings

    useChannel<number, number>(spinnerService.spinnerCounterChannel, callbackFactory(onSpinnerCounterChannel));

    return <SpinnerComponent isShow={state}/>
};
