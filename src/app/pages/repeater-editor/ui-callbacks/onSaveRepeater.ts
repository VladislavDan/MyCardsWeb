import {ICallback} from '../../../../MyTools/react-types/ICallback';
import {RepeaterEditorCallbackSettings} from '../types/RepeaterEditorCallbackSettings';
import {ICardsGroup} from '../../../common/types/ICardsGroup';

export const onSaveRepeater: ICallback<RepeaterEditorCallbackSettings, ICardsGroup[]> = (
    {setState, services: {repeaterEditorService, errorService}}
) => {
    setState((prevState) => {
        if (prevState.repeater.name) {
            repeaterEditorService.saveRepeaterChannel.next(prevState.repeater);
        } else {
            errorService.errorChannel.next('You cannot save repeater that does not have the name');
        }

        return prevState;
    })
}