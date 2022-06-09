export interface ICardsListActions {
    onOpenEditor: () => void;
    onOpenRepeater: () => void;
    onStartSelecting: () => void;
    onMovingSelectedCards: () => void;
    onDeleteSelectedCards: () => void;
    onCopySelectedCards: () => void;
    hideOpenRepeaterButton?: boolean;
    hideOpenEditorButton?: boolean;
    hideMovingSelectedCardsButton?: boolean;
    hideDeleteSelectedCardsButton?: boolean;
    hideCopySelectedCardButton?: boolean;
}