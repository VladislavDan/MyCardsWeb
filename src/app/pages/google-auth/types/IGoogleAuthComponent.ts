import {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";

export interface IGoogleAuthComponent {
    onSuccess: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void
    onFailure: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void
    height: number,
    width: number
}