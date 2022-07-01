export interface ICardsGroupsEditorComponent {
    groupName: string;
    onChangeGroupName: (groupName: string) => void;
    onSaveGroup: () => void;
}