import { Module } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

/**
 * MonitoringModule sets up Prometheus for application monitoring.
 */
@Module({
  imports: [PrometheusModule.register()],
  exports: [PrometheusModule],
})
export class MonitoringModule {}
