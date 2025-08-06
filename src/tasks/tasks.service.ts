import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel({
      ...dto,
      status: dto.status || 'pending',
    });
    return await newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return task;
  }

  async update(id: string, dto: CreateTaskDto): Promise<Task> {
    const task = await this.taskModel
      .findByIdAndUpdate(id, dto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return task;
  }

  async patch(id: string, partialDto: Partial<CreateTaskDto>): Promise<Task> {
    const task = await this.taskModel
      .findByIdAndUpdate(id, partialDto, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!task) throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    return task;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const result = await this.taskModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Tarea con ID ${id} no encontrada`);
    }
    return { deleted: true };
  }

  async findByStatus(status: string): Promise<Task[]> {
    return this.taskModel.find({ status }).exec();
  }
}
