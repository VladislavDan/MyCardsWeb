export const createEmptyBackupFile = (
    authToken: string,
    id: string,
    fileName: string
): Promise<string> => {

    const url = 'https://www.googleapis.com/drive/v3/files/';
    const requestOptions: any = {
        headers: {
            'Authorization': 'Bearer ' + authToken,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            parents: [id],
            name: fileName
        }),
        method: 'POST'
    }

    return fetch(url, requestOptions).then(
        (response) => response.json()
    ).then((result) => result.id)
}