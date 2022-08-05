import * as React from 'react';
import {FC, useCallback} from 'react';

import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {GoogleAuthComponent} from './GoogleAuthComponent';
import {AppContext} from '../../../App';
import {IGoogleAuthContainer} from "./types/IGoogleAuthContainer";
import {useCallbackFactory} from "../../../MyTools/react-hooks/useCallbackFactory";
import {onSuccess} from "./ui-callbacks/onSuccess";
import {onFailure} from "./ui-callbacks/onFailure";
import {onLoginChannel} from "./channels-callbacks/onLoginChannel";
import {GoogleAuthCallbackSettings} from "./types/GoogleAuthCallbackSettings";

export const GoogleAuthContainer: FC<IGoogleAuthContainer> = (services) => {

    const {
        callbackFactory,
        callbackSettings
    } = useCallbackFactory<GoogleAuthCallbackSettings>(
        null,
        services,
        AppContext
    );

    const {context, services: {googleAuthService}} = callbackSettings

    useChannel(googleAuthService.loginChannel, callbackFactory(onLoginChannel));

    const success = useCallback(callbackFactory(onSuccess), []);
    const failure = useCallback(callbackFactory(onFailure), []);

    return <GoogleAuthComponent
        onSuccess={success}
        onFailure={failure}
        height={context.height}
    />;
};
