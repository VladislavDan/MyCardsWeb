import {IDependenciesMapper} from 'src/MyTools/react-di/types/IDependenciesMapper';
import {getDataBaseService} from 'src/app/common/services/data-base-service/getDataBaseService';
import {getStorageService} from 'src/app/common/services/storage-service/getStorageService';
import {IDependenciesNames} from 'src/app/common/types/IDependenciesNames';

export const DependenciesMapper: IDependenciesMapper = {
    [IDependenciesNames.DataBaseService]: {
        dependencyFunction: getDataBaseService,
        childDependenciesKeys: []
    },
    [IDependenciesNames.StorageService]: {
        dependencyFunction: getStorageService,
        childDependenciesKeys: [IDependenciesNames.DataBaseService]
    }
};