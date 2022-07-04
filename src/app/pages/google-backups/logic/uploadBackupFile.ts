import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const uploadBackupFile = (
    authToken: string,
    fileId: string,
    cardsGroups: ICardsGroup[]
): Promise<string> => {

    const url = "https://www.googleapis.com/upload/drive/v3/files/" + fileId;
    const requestOptions: any = {
        headers: {
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(cardsGroups, null, 4),
        responseType: 'text',
        method: 'PATCH'
    }

    return fetch(url, requestOptions).then(() => fileId);
}