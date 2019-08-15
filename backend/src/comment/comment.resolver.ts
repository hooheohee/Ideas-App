import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../shared/auth.guard';
import { CommentDTO } from './comment.dto';

@Resolver('Comment')
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query()
  async comment(@Args('id') id: string) {
    return await this.commentService.show(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createComment(
    @Args('idea') ideaid: string,
    @Args('comment') comment: string,
    @Context('user') user,
  ) {
    const data: CommentDTO = { comment };
    const { id } = user;
    return await this.commentService.create(ideaid, id, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteComment(@Args('id') id: string, @Context('user') user) {
    const { id: userid } = user;
    return await this.commentService.destroy(id, userid);
  }
}
