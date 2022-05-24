export interface ISettings {
    isRandomRepeating: boolean;
    autoObsolete: {
        isEnable: boolean;
        timeInProgress: number;
        timeInDone: number;
    }
}
