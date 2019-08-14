import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from '../idea/idea.entity';
import { User } from '../user/user.entity';
import { Comment } from './comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Idea, User, Comment])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
