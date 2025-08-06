import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class TaskQueueService {
  constructor(@InjectQueue('taskQueue') private queue: Queue) {}

  async scheduleNotification(taskId: string) {
    await this.queue.add('notify', { taskId }, { delay: 10000 });
  }
}
