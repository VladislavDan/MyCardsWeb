import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {GoogleAuthComponent} from './GoogleAuthComponent';
import {AppContext} from '../../../App';
import {useCallbackFactory} from '../../../MyTools/react-hooks/useCallbackFactory';
import {onSuccess} from './ui-callbacks/onSuccess';
import {onFailure} from './ui-callbacks/onFailure';
import {onLoginChannel} from './channels-callbacks/onLoginChannel';
import {GoogleAuthCallbackSettings} from './types/GoogleAuthCallbackSettings';
import {useDependencyContext} from '../../../MyTools/react-di/hooks/useDependency';
import {GoogleAuthService} from './GoogleAuthService';
import {ErrorService} from '../../parts/error-dialog/ErrorService';
import {IDependenciesNames} from '../../common/types/IDependenciesNames';

export const GoogleAuthContainer: FC = () => {

    const googleAuthService = useDependencyContext<GoogleAuthService>(IDependenciesNames.GoogleAuthService);
    const errorService = useDependencyContext<ErrorService>(IDependenciesNames.ErrorService);

    const {
        callbackFactory,
        externalCallbackSettings
    } = useCallbackFactory<GoogleAuthCallbackSettings>(
        null,
        {googleAuthService, errorService},
        AppContext
    );

    const {context} = externalCallbackSettings;

    useChannel(googleAuthService.loginChannel, callbackFactory(onLoginChannel));

    const success = useCallback(callbackFactory(onSuccess), []);
    const failure = useCallback(callbackFactory(onFailure), []);

    return <GoogleAuthComponent
        onSuccess={success}
        onFailure={failure}
        height={context.height}
    />;
};
