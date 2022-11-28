import {IDependency} from 'src/MyTools/react-di/types/IDependency';

export interface IDataBaseService extends IDependency {
    get: <T>(key: string) => Promise<T>;
    set: <T>(key: string, value: T) => Promise<IDBValidKey>;
}