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
    const responseObj: any = comment;
    if (comment.author) {
      responseObj.author = comment.author.toResponseObject();
    }
    return responseObj;
  }

  async showByIdea(id: string) {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['comments', 'comments.author', 'comments.idea'],
    });
    return idea.comments.map(comment => this.toResponseObject(comment));
  }

  async showByUser(id: string) {
    const comments = await this.commentRepository.find({
      where: { author: { id } },
      relations: ['author'],
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
    if (comment.author.id !== userid) {
      throw new HttpException(
        'You do not own this comment',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await this.commentRepository.delete(comment);
    return 'Comment deleted!';
  }
}
