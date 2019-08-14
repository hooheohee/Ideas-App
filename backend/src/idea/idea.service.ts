import { User } from './../user/user.entity';
import { IdeaDTO } from './idea.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Idea } from './idea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Votes } from '../shared/votes.enum';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private toResponseObject(idea: Idea) {
    let temp: any = { ...idea, author: idea.author.toResponseObject(false) };
    if (temp.upvotes) {
      temp.upvotes = idea.upvotes.length;
    }
    if (temp.downvotes) {
      temp.downvotes = idea.downvotes.length;
    }
    return temp;
  }

  private ensureOwnership(idea: Idea, userid: string) {
    if (idea.author.id !== userid) {
      throw new HttpException('Incorrect user', HttpStatus.UNAUTHORIZED);
    }
  }

  async showAll() {
    const ideas = await this.ideaRepository.find({
      relations: ['author', 'upvotes', 'downvotes', 'comments'],
    });
    return ideas.map(idea => this.toResponseObject(idea));
  }

  async create(id: string, data: IdeaDTO) {
    const user = await this.userRepository.findOne(id);
    const idea = await this.ideaRepository.create({ ...data, author: user });
    await this.ideaRepository.save(idea);
    return this.toResponseObject(idea);
  }

  async read(id: string) {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author', 'upvotes', 'downvotes', 'comments'],
    });
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(idea);
  }

  async update(id: string, userid: string, data: Partial<IdeaDTO>) {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    this.ensureOwnership(idea, userid);
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    await this.ideaRepository.update(id, data);
    idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
    return this.toResponseObject(idea);
  }

  async destroy(id: string, userid: string) {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author', 'comments'],
    });
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    this.ensureOwnership(idea, userid);
    await this.ideaRepository.delete(id);
    return 'Successfully deleted.';
  }

  private async vote(idea: Idea, user: User, vote: Votes) {
    const opposite = vote === Votes.UP ? Votes.DOWN : Votes.UP;
    if (
      idea[opposite].filter(voter => voter.id === user.id).length > 0 ||
      idea[vote].filter(voter => voter.id === user.id).length > 0
    ) {
      idea[opposite] = idea[opposite].filter(voter => voter.id !== user.id);
      await this.ideaRepository.save(idea);
    } else if (idea[vote].filter(voter => voter.id === user.id).length < 1) {
      idea[vote].push(user);
      await this.ideaRepository.save(idea);
    } else {
      throw new HttpException('Unable to cast vote', HttpStatus.BAD_REQUEST);
    }
    return idea;
  }

  async upvote(id: string, userid: string) {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author', 'upvotes', 'downvotes', 'comments'],
    });
    const user = await this.userRepository.findOne(userid);
    idea = await this.vote(idea, user, Votes.UP);
    return this.toResponseObject(idea);
  }

  async downvote(id: string, userid: string) {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author', 'upvotes', 'downvotes', 'comments'],
    });
    const user = await this.userRepository.findOne(userid);
    idea = await this.vote(idea, user, Votes.DOWN);
    return this.toResponseObject(idea);
  }

  async bookmark(id: string, userid: string) {
    const idea = await this.ideaRepository.findOne(id);
    const user = await this.userRepository.findOne({
      where: { userid },
      relations: ['bookmarks'],
    });
    if (user.bookmarks.filter(bookmark => bookmark.id === idea.id).length < 1) {
      user.bookmarks.push(idea);
      await this.userRepository.save(user);
    } else {
      throw new HttpException(
        'Idea already bookmarked',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  async unbookmark(id: string, userid: string) {
    const idea = await this.ideaRepository.findOne(id);
    const user = await this.userRepository.findOne({
      where: { userid },
      relations: ['bookmarks'],
    });
    if (user.bookmarks.filter(bookmark => bookmark.id === idea.id).length > 0) {
      user.bookmarks = user.bookmarks.filter(
        bookmark => bookmark.id !== idea.id,
      );
      await this.userRepository.save(user);
    } else {
      throw new HttpException(
        'Idea already bookmarked',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }
}
