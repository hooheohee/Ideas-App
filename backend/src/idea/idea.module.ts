import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { Idea } from './idea.entity';
import { User } from '../user/user.entity';
import { IdeaResolver } from './idea.resolver';
import { Comment } from '../comment/comment.entity';
import { CommentService } from '../comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Idea, User, Comment])],
  controllers: [IdeaController],
  providers: [IdeaService, IdeaResolver, CommentService],
})
export class IdeaModule {}
