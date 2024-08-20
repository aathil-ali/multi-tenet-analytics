import { Injectable } from '@nestjs/common';
import { RedisClient } from 'redis';
import { promisify } from 'util';

/**
 * RedisService handles interactions with Redis.
 */
@Injectable()
export class RedisService {
  private client: RedisClient;
  private getAsync: (key: string) => Promise<string>;
  private setAsync: (key: string, value: string) => Promise<unknown>;

  constructor() {
    this.client = new RedisClient({ host: 'localhost', port: 6379 });
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
  }

  async storeEvent(
    tenantId: string,
    eventType: string,
    timestamp: number,
    data: string,
  ) {
    const key = `${tenantId}:${eventType}:${timestamp}`;
    await this.setAsync(key, data);
  }

  async getAggregatedData(tenantId: string) {
    // Implement logic to retrieve aggregated data from Redis
  }
}
