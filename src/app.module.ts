import { Module } from '@nestjs/common';
import { AmoActionsModule } from './amo-actions/amo-actions.module';

@Module({
  imports: [AmoActionsModule],
})
export class AppModule {}
