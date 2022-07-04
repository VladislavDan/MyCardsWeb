export const createBackupFolder = (authToken: string): Promise<string> => {

    const url = 'https://www.googleapis.com/drive/v3/files/';
    const backupFolderName = 'my-cards';
    const requestOptions: any = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: backupFolderName,
            mimeType: 'application/vnd.google-apps.folder'
        }),
        method: 'POST'
    }

    return fetch(url, requestOptions).then(
        (response) => response.json()
    ).then((result) => result.id)
}