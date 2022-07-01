import {GoogleAuthService} from "../GoogleAuthService";
import {ErrorService} from "../../../parts/error-container/ErrorService";

export interface IGoogleAuthContainer {
    googleAuthService: GoogleAuthService;
    errorService: ErrorService;
}