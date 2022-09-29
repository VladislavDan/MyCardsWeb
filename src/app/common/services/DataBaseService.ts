import {IDBPDatabase, openDB} from 'idb';
import {STORE_NAME} from "../constants/STORE_NAME";

export class DataBaseService {

    private dataBase: Promise<IDBPDatabase>;

    private DATA_BASE_NAME = "my-cards-data-base";

    constructor() {
        this.dataBase = openDB(this.DATA_BASE_NAME, 1, {
            upgrade(db) {
                db.createObjectStore(STORE_NAME);
            },
        });
    }

    get = async <T>(key: string) => {
        return (await this.dataBase).get(STORE_NAME, key);
    };

    set = async <T>(key: string, value: T) => {
        return (await this.dataBase).put(STORE_NAME, value, key);
    };
}
