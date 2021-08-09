import * as React from 'react';
import {FC, ReactElement, useContext, useEffect} from 'react';
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import {useHistory} from 'react-router';
import {Routs} from '../../common/Routs';

export const GoogleAuthComponent = () => {

    const history = useHistory();

    useEffect(() => {

        return () => {

        }
    });

    const onSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(response)
        history.replace(Routs.googleBackups.path);
    };

    const onFailure = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(response)
    };

    return <GoogleLogin
        clientId="627973926597-tj2la0mnorvm04cqmcosu2nj3b02g6k2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
    />;
};

interface GoogleAuthComponentProps {
}
