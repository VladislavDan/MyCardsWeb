export interface IRepeater {
    id: number;
    name: string;
    cardsGroupsIDs: number[];
    autoObsolete: {
        isEnable: boolean;
        timeInProgress: number;
        timeInDone: number;
    };
}