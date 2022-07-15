import GoogleLogin from 'react-google-login';
import * as React from 'react';
import {FC} from 'react';
import './GoogleAuthComponent.css'
import {IGoogleAuthComponent} from "./types/IGoogleAuthComponent";

export const GoogleAuthComponent: FC<IGoogleAuthComponent> = ({onSuccess, onFailure, height}) => {
    return (
        <div className="google-auth" style={{height}}>
            <GoogleLogin
                className="google-auth_button"
                clientId="627973926597-tj2la0mnorvm04cqmcosu2nj3b02g6k2.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                scope={'profile email https://www.googleapis.com/auth/drive'}
            />
        </div>
    )
};
