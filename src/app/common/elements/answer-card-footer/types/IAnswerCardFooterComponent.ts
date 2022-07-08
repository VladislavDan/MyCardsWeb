import {ICard} from "../../../types/ICard";

export interface IAnswerCardFooterComponent {
    onClickYesNoButton: (isUnderstandable: boolean) => void;
    card: ICard | undefined;
}