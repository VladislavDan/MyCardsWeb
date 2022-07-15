import * as React from 'react';
import {FC} from 'react';
import {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {useHistory} from 'react-router';

import {Routs} from '../../common/Routs';
import {useChannel} from '../../../MyTools/channel-conception/react-hooks/useChannel';
import {GoogleAuthComponent} from './GoogleAuthComponent';
import {IAppContext} from '../../common/types/IAppContext';
import {AppContext} from '../../../App';
import {IGoogleAuthContainer} from "./types/IGoogleAuthContainer";

export const GoogleAuthContainer: FC<IGoogleAuthContainer> = ({googleAuthService, errorService}) => {

    const history = useHistory();

    useChannel(googleAuthService.loginChannel, ()=> {
        history.replace(Routs.googleBackups.path);
    });

    const {height} = React.useContext<IAppContext>(AppContext);

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
    />;
};
