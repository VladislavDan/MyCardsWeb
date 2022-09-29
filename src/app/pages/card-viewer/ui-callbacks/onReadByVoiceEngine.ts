import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {CardViewerCallbackSettings} from "../types/CardViewerCallbackSettings";

export const onReadByVoiceEngine: ICallback<CardViewerCallbackSettings, void> = (
    {services, setState}
) => {
    setState((prevState) => {
        if (prevState.isQuestionSide) {
            services.cardViewerService.readByVoiceEngineChannel.next(prevState.card.question);
        } else {
            services.cardViewerService.readByVoiceEngineChannel.next(prevState.card.answer);
        }
        return prevState;
    })
}