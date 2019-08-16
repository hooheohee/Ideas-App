import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.prod";
import { HttpClient } from "@angular/common/http";
import { AuthType, AuthDTO } from "../models/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private api: string = environment.api_server + "/auth";

  constructor(private httpClient: HttpClient) {}

  private auth(authType: AuthType, data: AuthDTO) {
    return this.httpClient.post(`${this.api}/${authType}`, data);
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
