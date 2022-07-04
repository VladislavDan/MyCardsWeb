export const deleteBackupFile = (
    authToken: string,
    fileId: string
): Promise<string> => {

    const url = 'https://www.googleapis.com/drive/v3/files/' + fileId;
    const requestOptions: RequestInit = {
        headers: {
            'Authorization': 'Bearer ' + authToken
        },
        method: 'DELETE'
    }

    return fetch(url, requestOptions).then(() => fileId)
}