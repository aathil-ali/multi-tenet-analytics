import { Module } from '@nestjs/common';
import { MongoService } from './mongo.service';

/**
 * MongoModule provides MongoService.
 */
@Module({
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
