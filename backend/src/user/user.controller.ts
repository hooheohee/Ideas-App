import { AuthGuard } from './../shared/auth.guard';
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
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User } from './user.decorator';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  @UseGuards(new AuthGuard())
  showAllUsers(@User('username') user) {
    return this.userService.showAll();
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
