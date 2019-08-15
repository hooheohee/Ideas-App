import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { Idea } from '../idea/idea.entity';
import { User } from '../user/user.entity';
import { CommentDTO } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private toResponseObject(comment: Comment) {
    return {
      ...comment,
      author: comment.author && comment.author.toResponseObject(),
    };
  }

  async showByIdea(id: string, page: number = 1) {
    const comments = await this.commentRepository.find({
      where: { idea: { id } },
      relations: ['author'],
      take: 10,
      skip: 10 * (page - 1),
    });
    return comments.map(comment => this.toResponseObject(comment));
  }

  async showByUser(id: string, page: number = 1) {
    const comments = await this.commentRepository.find({
      where: { author: { id } },
      relations: ['author'],
      take: 10,
      skip: 10 * (page - 1),
    });
    return comments.map(comment => this.toResponseObject(comment));
  }

  async show(id: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });
    return this.toResponseObject(comment);
  }

  async create(ideaid: string, userid: string, data: CommentDTO) {
    const idea = await this.ideaRepository.findOne(ideaid);
    const user = await this.userRepository.findOne(userid);
    const comment = await this.commentRepository.create({
      ...data,
      idea,
      author: user,
    });
    await this.commentRepository.save(comment);
    return this.toResponseObject(comment);
  }

  async destroy(id: string, userid: string) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['author', 'idea'],
    });
    if (!comment) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (comment.author.id !== userid) {
      throw new HttpException(
        'You do not own this comment',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.commentRepository.delete(id);
    return 'Successfully deleted!';
  }
}
