import {IGoogleDriveFile} from "../../../common/types/IGoogleDriveFile";

export const getBackupFolder = (token: string): Promise<IGoogleDriveFile | null> => {

    const googleDriveFolderType = 'application/vnd.google-apps.folder';
    const googleDriveFilesAPI = 'https://www.googleapis.com/drive/v3/files/';
    const backupFolderName = 'my-cards';
    const searchFolderURI = googleDriveFilesAPI + '?q=name%20contains%20';
    const url = `${searchFolderURI}'${backupFolderName}'`
    const requestOptions: RequestInit = {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        method: 'GET'
    }

    return fetch(url, requestOptions).then(
        (result) => result.json()
    ).then((result: { files: IGoogleDriveFile[] }) => {
        let foundedFolder = result.files.find((file) => {
            return file.mimeType === googleDriveFolderType
        });
        return foundedFolder || null;
    })
}