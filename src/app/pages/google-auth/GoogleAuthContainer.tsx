import * as React from 'react';
import {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {useHistory} from 'react-router';

import {Routs} from '../../common/Routs';
import {useObservable} from '../../common/hooks/useObservable';
import {googleAuthService} from './GoogleAuthService';
import {GoogleAuthComponent} from './google-auth-component/GoogleAuthComponent';
import {IAppContext} from '../../types/IAppContext';
import {AppContext, errorService} from '../../../App';

export const GoogleAuthContainer = () => {

    const history = useHistory();

    useObservable(googleAuthService.loginChannel, ()=> {
        history.replace(Routs.googleBackups.path);
    });

    const {height, width} = React.useContext<IAppContext>(AppContext);

    const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        googleAuthService.loginChannel.next((response as GoogleLoginResponse).accessToken);
    };

    const onFailure = () => {
        errorService.errorChannel.next('Error of connection');
    };

    return <GoogleAuthComponent
        onSuccess={onSuccess}
        onFailure={onFailure}
        height={height}
        width={width}
    />;
};
