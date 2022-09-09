import {ICallback} from "../../../../MyTools/react-utils/CallbackFactory";
import {CardRepeaterCallbackSettings} from "../types/CardRepeaterCallbackSettings";

export const onReadByVoiceEngine: ICallback<CardRepeaterCallbackSettings, void> = (
    {setState, services}
) => {
    setState((prevState) => {
        if (prevState.isQuestionSide) {
            services.cardsRepeaterService.readByVoiceEngineChannel.next(prevState.card.question);
        } else {
            services.cardsRepeaterService.readByVoiceEngineChannel.next(prevState.card.answer);
        }
        return prevState;
    })
}