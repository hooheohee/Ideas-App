import { IdeaDTO } from './idea.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Idea } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
  ) {}

  async showAll() {
    return await this.ideaRepository.find();
  }

  async create(data: IdeaDTO) {
    const idea = await this.ideaRepository.create(data);
    await this.ideaRepository.save(idea);
    return idea;
  }

  async read(id: string) {
    const idea = await this.ideaRepository.findOne(id);
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, data: Partial<IdeaDTO>) {
    let idea = await this.ideaRepository.findOne(id);
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.ideaRepository.update(id, data);
    idea = await this.ideaRepository.findOne(id);
    return idea;
  }

  async destroy(id: string) {
    const idea = await this.ideaRepository.findOne(id);
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.ideaRepository.delete(id);
    return 'Successfully deleted.';
  }
}
