import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { Idea } from './idea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Idea])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
