export default interface ICacheProvider {
    save(key: string, value: string): Promise<void>;
    recovery(key: string): Promise<string>;
    invalidate(key: string): Promise<void>;
}
