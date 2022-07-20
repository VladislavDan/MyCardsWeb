import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {GoogleAuthCallbackSettings} from "../types/GoogleAuthCallbackSettings";
import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";

export const onFailure: ICallback<GoogleAuthCallbackSettings, GoogleLoginResponse | GoogleLoginResponseOffline> = (
    {services: {errorService}}
) => {
    errorService.errorChannel.next('Error of connection');
}