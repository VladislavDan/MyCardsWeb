import {IDBPDatabase, openDB} from 'idb';

export class DataBaseService {

    private dataBase: Promise<IDBPDatabase>;

    private DATA_BASE_NAME = "app-data-base";

    constructor(private storeName: string) {
        this.dataBase = openDB(this.DATA_BASE_NAME, 1, {
            upgrade(db) {
                db.createObjectStore(storeName);
            },
        });
    }

    get = async <T>(key: string) => {
        return (await this.dataBase).get(this.storeName, key);
    };

    set = async <T>(key: string, value: T) => {
        return (await this.dataBase).put(this.storeName, value, key);
    };
}
