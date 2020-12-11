import Redis, { Redis as RedisCLient } from 'ioredis';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
    private client: RedisCLient;

    constructor() {
        this.client = new Redis();
    }

    save(key: string, value: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    recovery(key: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

    invalidate(key: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
