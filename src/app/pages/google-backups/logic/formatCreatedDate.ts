import {IGoogleDriveFile} from '../../../common/types/IGoogleDriveFile';

export const formatCreatedDate = (googleDriveFiles: IGoogleDriveFile[] | null) => {
    return googleDriveFiles ? googleDriveFiles.map((googleDriveFile: IGoogleDriveFile) => {
        const date = new Date(googleDriveFile.createdTime);
        const outputFormat = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
        return {
            ...googleDriveFile, createdTime: outputFormat
        };
    }) : [];
};
