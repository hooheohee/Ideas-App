import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { IdeaService } from './idea.service';
import { CommentService } from '../comment/comment.service';

@Resolver('Idea')
export class IdeaResolver {
  constructor(
    private ideaService: IdeaService,
    private commentsService: CommentService,
  ) {}

  @Query()
  async ideas(@Args('page') page: number, @Args('newest') newest: boolean) {
    return await this.ideaService.showAll(page, newest);
  }

  @ResolveProperty()
  async comments(@Parent() idea) {
    const { id } = idea;
    return await this.commentsService.showByIdea(id);
  }
}
