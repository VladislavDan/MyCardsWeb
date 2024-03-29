import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {GoogleAuthCallbackSettings} from "../types/GoogleAuthCallbackSettings";
import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";

export const onFailure: ICallback<GoogleAuthCallbackSettings, GoogleLoginResponse | GoogleLoginResponseOffline> = (
    {services: {errorService}}
) => {
    errorService.errorChannel.next('Error of connection');
}