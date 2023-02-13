import {GoogleAuthService} from '../GoogleAuthService';
import {ErrorService} from '../../../parts/error-dialog/ErrorService';

export interface IGoogleAuthContainer {
    googleAuthService: GoogleAuthService;
    errorService: ErrorService;
}