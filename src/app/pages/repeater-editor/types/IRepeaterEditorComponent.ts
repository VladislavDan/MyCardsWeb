import {ICardsGroup} from "../../../common/types/ICardsGroup";

export interface IRepeaterEditorComponent {
    onSaveRepeater: () => void;
    cardsGroups: ICardsGroup[];
    height: number;
    onSelect: (id: number) => void;
    selectedGroups: {
        [key: number]: boolean;
    };
    onChangeName: (name: string) => void;
    repeaterName: string;
}