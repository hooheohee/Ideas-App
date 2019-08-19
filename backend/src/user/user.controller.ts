import { ValidationPipe } from './../shared/validation.pipe';
import { UserService } from './user.service';
import {
  Controller,
  Post,
  Get,
  Body,
  UsePipes,
  UseGuards,
  HttpCode,
  Query,
  Param,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { AuthGuard } from '../shared/auth.guard';
import { User } from './user.decorator';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  showAllUsers(@Query('page') page: number) {
    return this.userService.showAll(page);
  }

  @Get('api/users/:username')
  showOneUser(@Param('username') username: string) {
    return this.userService.read(username);
  }

  @Get('whoami')
  @UseGuards(new AuthGuard())
  showMe(@User('username') username: string) {
    return this.userService.read(username);
  }

  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
