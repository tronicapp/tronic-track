import { Traits } from '../events';
import { CookieOptions, StorageSettings } from '../storage';
export type ID = string | null | undefined;
export interface UserOptions {
    /**
     * Disables storing any data about the user.
     */
    disable?: boolean;
    localStorageFallbackDisabled?: boolean;
    persist?: boolean;
    cookie?: {
        key?: string;
        oldKey?: string;
    };
    localStorage?: {
        key: string;
    };
    /**
     * Store priority
     * @example stores: [StoreType.Cookie, StoreType.Memory]
     */
    storage?: StorageSettings;
}
export declare class User {
    static defaults: {
        persist: boolean;
        cookie: {
            key: string;
            oldKey: string;
        };
        localStorage: {
            key: string;
        };
    };
    private idKey;
    private traitsKey;
    private anonKey;
    private cookieOptions?;
    private legacyUserStore;
    private traitsStore;
    private identityStore;
    options: UserOptions;
    constructor(options?: UserOptions, cookieOptions?: CookieOptions);
    id: (id?: ID) => ID;
    private legacySIO;
    anonymousId: (id?: ID) => ID;
    traits: (traits?: Traits | null) => Traits | undefined;
    identify(id?: ID, traits?: Traits): void;
    logout(): void;
    reset(): void;
    load(): User;
    save(): boolean;
    /**
     * Creates the right storage system applying all the user options, cookie options and particular filters
     * @param options UserOptions
     * @param cookieOpts CookieOptions
     * @param filterStores filter function to apply to any StoreTypes (skipped if options specify using a custom storage)
     * @returns a Storage object
     */
    private createStorage;
}
export declare class Group extends User {
    constructor(options?: UserOptions, cookie?: CookieOptions);
    anonymousId: (_id?: ID) => ID;
}
//# sourceMappingURL=index.d.ts.map