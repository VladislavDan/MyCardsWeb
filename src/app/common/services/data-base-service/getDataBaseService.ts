import {IDBPDatabase, openDB} from 'idb';
import {STORE_NAME} from 'src/app/common/constants/STORE_NAME';
import {IDependencyFunction} from 'src/MyTools/react-di/types/IDependencyFunction';
import {IDataBaseService} from 'src/app/common/services/data-base-service/types/IDataBaseService';

export const getDataBaseService: IDependencyFunction<IDataBaseService> = () => {

    let DATA_BASE_NAME = 'my-cards-data-base';

    let dataBase: Promise<IDBPDatabase> = openDB(DATA_BASE_NAME, 1, {
        upgrade(db) {
            db.createObjectStore(STORE_NAME);
        },
    });

    const get = async <T>(key: string) => {
        return (await dataBase).get(STORE_NAME, key) as Promise<T>;
    };

    const set = async <T>(key: string, value: T) => {
        return (await dataBase).put(STORE_NAME, value, key);
    };

    return {
        get,
        set
    }
}
