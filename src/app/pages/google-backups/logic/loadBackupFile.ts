import {ICardsGroup} from "../../../common/types/ICardsGroup";

export const loadBackupFile = (authToken: string, fileId: string): Promise<ICardsGroup[]> => {

    const googleDriveFilesAPI = 'https://www.googleapis.com/drive/v3/files/';
    const url = googleDriveFilesAPI + fileId + '?alt=media';
    const requestOptions: RequestInit = {
        headers: {
            'Authorization': 'Bearer ' + authToken
        },
        method: 'GET'
    }

    return fetch(url, requestOptions).then(
        (response) => response.json()
    )
}