import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { TaskQueueService } from '../task-queue/task-queue.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly taskQueueService: TaskQueueService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarea' })
  async create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tareas' })
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  async findOne(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar completamente una tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  @ApiBody({ type: CreateTaskDto })
  async update(@Param('id') id: string, @Body() dto: CreateTaskDto) {
    return this.tasksService.update(id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar parcialmente una tarea' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  async patch(
    @Param('id') id: string,
    @Body() partialDto: Partial<CreateTaskDto>,
  ) {
    return this.tasksService.patch(id, partialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea por ID' })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  async remove(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Obtener tareas por estado' })
  @ApiParam({
    name: 'status',
    description: 'Estado de la tarea (pending, in_progress, completed)',
  })
  async findByStatus(@Param('status') status: string) {
    return this.tasksService.findByStatus(status);
  }

  @Post(':id/schedule')
  @ApiOperation({
    summary: 'Programar una tarea asíncrona para una tarea existente',
  })
  @ApiParam({ name: 'id', description: 'ID de la tarea' })
  async schedule(@Param('id') id: string) {
    await this.taskQueueService.scheduleNotification(id);
    return { message: `Task ${id} scheduled for notification.` };
  }
}
