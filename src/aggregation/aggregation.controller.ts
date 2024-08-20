import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AggregationService } from './aggregation.service';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

/**
 * AggregationController handles requests for aggregated data.
 */
@Controller('aggregation')
@UseInterceptors(LoggingInterceptor)
export class AggregationController {
  constructor(private readonly aggregationService: AggregationService) {}

  /**
   * Retrieves aggregated data for a specific tenant.
   * @param tenantId - Tenant identifier.
   */
  @Get()
  async getAggregatedData(@Query('tenantId') tenantId: string) {
    return this.aggregationService.getAggregatedData(tenantId);
  }
}
