import {CardsGroup} from "./screens/cards-screen/CardsGroup";
import {CardsState} from "./screens/cards-screen/CardsState";
import {Filter} from "./Filter";
import {GoogleDriveFileInfo} from "./GoogleDriveFileInfo";
import {Progress} from "./Progress";
import {Settings} from "./Settings";
import {Task} from "./Task";

export interface AppState {
    files: GoogleDriveFileInfo[] | Task[];
    tasks: Task[];
    progress: Progress;
    filter: Filter;
    dangerousLevel: number;
    settings: Settings;
    cards: CardsState;
    cardsGroups: CardsGroup[];
}
