import { IdeaService } from './idea.service';
import {
  Get,
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { IdeaDTO } from './idea.dto';

@Controller('idea')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  createIdea(@Body() data: IdeaDTO) {
    return this.ideaService.create(data);
  }

  @Get(':id')
  readIdea(@Param() id: string) {
    return this.ideaService.read(id);
  }

  @Put(':id')
  updateIdea(@Param() id: string, @Body() data: IdeaDTO) {
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  destroyIdea(@Param() id: string) {
    return this.ideaService.destroy(id);
  }
}
