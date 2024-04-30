export class BrowserStorage {
    constructor (private readonly _storage: Storage) {}

    getItem<T = any> (key: string): T | null {
        try {
            const data = this._storage.getItem(key);

            try {
                return data ? JSON.parse(data) : data;
            } catch (error) {
                console.warn(error);
                return data as (T | null);
            }
        } catch (error) {
            console.warn(`Failed to get item "${ key }" from storage`, error);
            return null;
        }
    }

    removeItem (key: string): void {
        try {
            return this._storage.removeItem(key);
        } catch (error) {
            console.warn(error);
        }
    }

    setItem<T = any> (key: string, value: T): void {
        try {
            const data = JSON.stringify(value);
            return this._storage.setItem(key, data);
        } catch (error) {
            console.warn(`Failed to set item "${ key }" to storage`, value, error);
        }
    }
}
