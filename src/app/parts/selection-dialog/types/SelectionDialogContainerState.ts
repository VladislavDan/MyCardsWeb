export interface SelectionDialogContainerState {
    isOpen: boolean;
    title: string;
    selectionItems: Array<{
        id: number;
        label: string;
    }>
}