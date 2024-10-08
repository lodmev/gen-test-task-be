import { Module } from '@nestjs/common';
import { AmoActionsService } from './amo-actions.service';
import { AmoActionsController } from './amo-actions.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AmoActionsController],
  providers: [AmoActionsService],
})
export class AmoActionsModule {}
