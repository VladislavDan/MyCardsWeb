import {ICard} from "../../../types/ICard";

export interface IAnswerCardFooterComponent {
    onClick: (isUnderstandable: boolean) => void;
    card: ICard | undefined;
}