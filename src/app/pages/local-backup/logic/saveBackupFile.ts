import {ICardsGroup} from '../../../common/types/ICardsGroup';

export const saveBackupFile = (backup: ICardsGroup[]) => {
    const fileData: string = JSON.stringify(backup, null, 4);
    const blob = new Blob([fileData], {type: "octet/stream"});
    const url = window.URL.createObjectURL(blob);

    const fileBuffer = document.createElement('a');

    if (fileBuffer) {
        fileBuffer.href = url;
        fileBuffer.download = 'My Cards.txt';
        fileBuffer.click();
    }
    window.URL.revokeObjectURL(url);
};
