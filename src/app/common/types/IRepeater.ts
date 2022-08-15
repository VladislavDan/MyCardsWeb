export interface IRepeater {
    id: number;
    cardsGroupsIDs: number[];
    autoObsolete: {
        isEnable: boolean;
        timeInProgress: number;
        timeInDone: number;
    };
    isRandomRepeating: boolean;
}