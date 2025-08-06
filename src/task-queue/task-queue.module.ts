import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TaskQueueService } from './task-queue.service';
import { TaskQueueProcessor } from './task-queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'taskQueue',
    }),
  ],
  providers: [TaskQueueService, TaskQueueProcessor],
  exports: [TaskQueueService],
})
export class TaskQueueModule {}
