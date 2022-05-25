export interface ICardsListActions {
    onOpenEditor: () => void;
    onOpenRepeater: () => void;
    onStartSelecting: () => void;
    onMovingSelectedCards: () => void;
    onDeleteSelectedCards: () => void;
    hideOpenRepeaterButton?: boolean;
    hideOpenEditorButton?: boolean;
    hideMovingSelectedCardsButton?: boolean;
    hideDeleteSelectedCardsButton?: boolean;
}