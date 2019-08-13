import { IsNotEmpty } from 'class-validator';
import { Idea } from '../idea/idea.entity';

export class UserDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserRO {
  id: string;
  username: string;
  created: Date;
  ideas?: Idea[];
  bookmarks?: Idea[];
  token?: string;
}
