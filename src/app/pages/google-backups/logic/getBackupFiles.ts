import {IGoogleDriveFile} from "../../../common/types/IGoogleDriveFile";

export const getBackupFiles = (authToken: string, folder: IGoogleDriveFile | null): Promise<IGoogleDriveFile[] | null> => {

    const googleDriveFilesAPI = 'https://www.googleapis.com/drive/v3/files/';
    const url = `${googleDriveFilesAPI}?q="${folder ? folder.id : -1}"+in+parents&fields=files(id,createdTime,name)`
    const requestOptions: RequestInit = {
        headers: {
            'Authorization': 'Bearer ' + authToken
        },
        method: 'GET'
    }

    return fetch(url, requestOptions).then(
        (response) => response.json()
    ).then((result) => result.files)
}