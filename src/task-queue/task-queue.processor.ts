import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';

@Processor('taskQueue')
export class TaskQueueProcessor {
  @Process('notify')
  handleNotification(job: Job) {
    console.log(`Notificando sobre la tarea ${job.data.taskId}`);
  }
}
