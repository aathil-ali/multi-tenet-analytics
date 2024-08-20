import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MongoService } from '../mongo/mongo.service';
import { RedisService } from '../redis/redis.service';

/**
 * AggregationService handles the aggregation of data.
 */
@Injectable()
export class AggregationService {
  constructor(
    private readonly redisService: RedisService,
    private readonly mongoService: MongoService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * Retrieves aggregated data for a specific tenant.
   * @param tenantId - Tenant identifier.
   */
  async getAggregatedData(tenantId: string) {
    const cacheKey = `aggregatedData:${tenantId}`;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const redisData = await this.redisService.getAggregatedData(tenantId);
    const mongoData = await this.mongoService.getAggregatedData(tenantId);
    const aggregatedData = { redisData, mongoData };

    await this.cacheManager.set(cacheKey, aggregatedData, { ttl: 60 }); // Cache for 60 seconds
    return aggregatedData;
  }
}
