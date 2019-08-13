import { ValidationPipe } from './../shared/validation.pipe';
import { IdeaService } from './idea.service';
import {
  Get,
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { IdeaDTO } from './idea.dto';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../user/user.decorator';

@Controller('api/ideas')
export class IdeaController {
  private logger = new Logger();

  constructor(private ideaService: IdeaService) {}

  private logData(options: any) {
    options.user && this.logger.log('USER' + JSON.stringify(options.user));
    options.data && this.logger.log('DATA' + JSON.stringify(options.data));
    options.id && this.logger.log('IDEA' + JSON.stringify(options.id));
  }

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createIdea(@User('id') user, @Body() data: IdeaDTO) {
    this.logData({ user, data });
    return this.ideaService.create(user, data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateIdea(
    @Param('id') id: string,
    @User('id') user,
    @Body() data: Partial<IdeaDTO>,
  ) {
    this.logData({ id, user, data });
    return this.ideaService.update(id, user, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyIdea(@Param('id') id: string, @User('id') userid) {
    this.logData({ id, userid });
    return this.ideaService.destroy(id, userid);
  }

  @Post(':id/upvote')
  @UseGuards(new AuthGuard())
  upvoteIdea(@Param('id') id: string, @User('id') userid: string) {
    this.logData({ id, userid });
    return this.ideaService.upvote(id, userid);
  }

  @Post(':id/downvote')
  @UseGuards(new AuthGuard())
  downvoteIdea(@Param('id') id: string, @User('id') userid: string) {
    this.logData({ id, userid });
    return this.ideaService.downvote(id, userid);
  }

  @Post(':id/bookmark')
  @UseGuards(new AuthGuard())
  bookmarkIdea(@Param('id') id: string, @User('id') userid: string) {
    this.logData({ id, userid });
    return this.ideaService.bookmark(id, userid);
  }

  @Delete(':id/bookmark')
  @UseGuards(new AuthGuard())
  unbookmark(@Param('id') id: string, @User('id') userid: string) {
    this.logData({ id, userid });
    return this.ideaService.unbookmark(id, userid);
  }
}
