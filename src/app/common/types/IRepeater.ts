export interface IRepeater {
    id: number;
    name: string;
    cardsGroupsIDs: number[];
    percentRepeatedCards?: number;
    groupsNames?: string[];
}