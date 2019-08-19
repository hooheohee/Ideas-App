import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";
import { AuthType, AuthDTO } from "../models/auth";
import { mergeMap } from "rxjs/operators";
import { User } from "../models/user";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private api: string = environment.api_server;

  constructor(private httpClient: HttpClient) {}

  private auth(authType: AuthType, data: AuthDTO) {
    return this.httpClient.post(`${this.api}/${authType}`, data).pipe(
      mergeMap((user: User) => {
        this.token = user.token;
        return of(user);
      })
    );
  }

  login(data: AuthDTO) {
    return this.auth("login", data);
  }

  register(data: AuthDTO) {
    return this.auth("register", data);
  }

  whoami() {
    return this.httpClient.get(`${this.api}/whoami`, {
      headers: { authorization: `Bearer ${this.token}` }
    });
  }

  get token() {
    return localStorage.getItem("idea-token");
  }

  set token(val: string) {
    if (val) {
      localStorage.setItem("idea-token", val);
    } else {
      localStorage.clear();
    }
  }
}
