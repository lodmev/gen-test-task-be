import { Module } from '@nestjs/common';
import { AmoActionsService } from './amo-actions.service';
import { AmoActionsController } from './amo-actions.controller';

@Module({
  controllers: [AmoActionsController],
  providers: [AmoActionsService],
})
export class AmoActionsModule {}
