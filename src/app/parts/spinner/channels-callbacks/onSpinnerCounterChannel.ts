import {ICallback} from "../../../../MyTools/react-types/ICallback";
import {SpinnerCallbackSettings} from "../types/SpinnerCallbackSettings";

export const onSpinnerCounterChannel: ICallback<SpinnerCallbackSettings, number> = (
    {setState},
    spinnerCounter = 0
) => {
    setState(() => spinnerCounter !== 0);
}