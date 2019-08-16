import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { AuthService } from "./auth.service";
import { IdeaDTO } from "../models/idea";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private api: string = environment.api_server + "api";

  constructor(private httpClient: HttpClient, private auth: AuthService) {}

  private request(method: string, endpoint: string, body?: any) {
    const url = `${this.api}/${endpoint}`;
    return this.httpClient.request(method, url, {
      body,
      headers: { authorization: `Bearer ${this.auth.token}` }
    });
  }

  getUsers(page?: number) {
    const endpoint = page ? `users?page=${page}` : "users";
    return this.request("GET", endpoint);
  }

  getUser(username: string) {
    return this.request("GET", `users/${username}`);
  }

  getIdeas(page?: number) {
    const endpoint = page ? `ideas?page=${page}` : "ideas";
    return this.request("GET", endpoint);
  }

  getNewestIdeas(page?: number) {
    const endpoint = page ? `ideas/newest?page=${page}` : "ideas/newest";
    return this.request("GET", endpoint);
  }

  getIdea(id: string) {
    return this.request("GET", `ideas/${id}`);
  }

  createIdea(data: IdeaDTO) {
    return this.request("POST", "ideas", data);
  }

  updateIdea(id: string, data: Partial<IdeaDTO>) {
    return this.request("PUT", `ideas/${id}`, data);
  }

  deleteIdea(id: string) {
    return this.request("DELETE", `ideas/${id}`);
  }

  upvote(id: string) {
    return this.request("POST", `ideas/${id}/upvote`);
  }

  downvote(id: string) {
    return this.request("POST", `ideas/${id}/downvote`);
  }

  bookmark(id: string) {
    return this.request("POST", `ideas/${id}/bookmark`);
  }

  unbookmark(id: string) {
    return this.request("POST", `ideas/${id}/unbookmark`);
  }

  getCommentsByIdea(id: string, page?: number) {
    const endpoint = page
      ? `comments/idea/${id}?page=${page}`
      : `comments/idea/${id}`;
    return this.request("GET", endpoint);
  }

  getCommentsByUser(id: string, page?: number) {
    const endpoint = page
      ? `comments/user/${id}?page=${page}`
      : `comments/user/${id}`;
    return this.request("GET", endpoint);
  }

  getComment(id: string) {
    return this.request("GET", `comments/${id}`);
  }

  createComment(idea: string, data) {
    return this.request("POST", `comments/idea/${idea}`, data);
  }

  deleteComment(id: string) {
    return this.request("DELETE", `comments/${id}`);
  }
}
