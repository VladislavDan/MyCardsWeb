import * as React from 'react';
import {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {useHistory} from 'react-router';

import {Routs} from '../../common/Routs';
import {useSubscribe} from '../../common/hooks/useSubscribe';
import {googleAuthManager} from './GoogleAuthManager';
import {errorManager} from '../../elements/error-container/ErrorService';
import {GoogleAuthComponent} from './elements/GoogleAuthComponent';
import {IAppContext} from '../../types/IAppContext';
import {AppContext} from '../../../App';

export const GoogleAuthContainer = () => {

    const history = useHistory();

    useSubscribe(googleAuthManager.loginChannel, ()=> {
        history.replace(Routs.googleBackups.path);
    });

    const {height, width} = React.useContext<IAppContext>(AppContext);

    const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        googleAuthManager.loginChannel.next((response as GoogleLoginResponse).accessToken);
    };

    const onFailure = () => {
        errorManager.errorChannel.next('Error of connection');
    };

    return <GoogleAuthComponent
        onSuccess={onSuccess}
        onFailure={onFailure}
        height={height}
        width={width}
    />;
};
