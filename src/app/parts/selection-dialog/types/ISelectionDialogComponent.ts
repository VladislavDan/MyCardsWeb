export interface ISelectionDialogComponent {
    onClickItem: (itemID: number) => void;
    onClose: () => void;
    isOpen: boolean;
    title: string;
    selectionItems: Array<{
        id: number;
        label: string;
    }>
}