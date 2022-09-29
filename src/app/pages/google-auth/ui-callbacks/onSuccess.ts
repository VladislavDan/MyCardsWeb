import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {GoogleAuthCallbackSettings} from "../types/GoogleAuthCallbackSettings";

export const onSuccess: ICallback<GoogleAuthCallbackSettings, GoogleLoginResponse | GoogleLoginResponseOffline> = (
    {services: {googleAuthService}},
    response
) => {
    googleAuthService.loginChannel.next((response as GoogleLoginResponse).accessToken);
}