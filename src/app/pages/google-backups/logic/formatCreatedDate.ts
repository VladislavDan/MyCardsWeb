import {IGoogleDriveFile} from '../../../common/types/IGoogleDriveFile';

export const formatCreatedDate = (googleDriveFiles: IGoogleDriveFile[]) => {
    return googleDriveFiles.map((googleDriveFile: IGoogleDriveFile) => {
        return {...googleDriveFile, createdTime: googleDriveFile.createdTime.slice(0, 10)};
    });
};
