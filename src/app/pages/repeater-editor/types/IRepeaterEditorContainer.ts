import {RepeaterEditorService} from '../RepeaterEditorService';
import {ErrorService} from '../../../parts/error-dialog/ErrorService';

export interface IRepeaterEditorContainer {
    repeaterEditorService: RepeaterEditorService;
    errorService: ErrorService;
}