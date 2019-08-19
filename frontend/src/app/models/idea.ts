import { User } from "@app/models/user";

export interface Idea {
  id: string;
  created: Date;
  updated: Date;
  idea: string;
  description: string;
  author: User;
  upvotes?: number;
  downvotes?: number;
  comments?: Comment[];
}

export interface IdeaDTO {
  id?: string;
  idea: string;
  description: string;
}
