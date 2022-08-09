import {of} from "rxjs";

import {Channel} from "../../../MyTools/channel-conception/Channel";
import {getPageLabel} from "./logic/getPageLabel";

export class ToolbarService {

    public toolbarExternalLabelChannel: Channel<string, string> = new Channel(
        (name: string) => of(name)
    )

    public pageLabelChannel: Channel<string, string> = new Channel(
        (path: string) => of(getPageLabel(path))
    )
}
