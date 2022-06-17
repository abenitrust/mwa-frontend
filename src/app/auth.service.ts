import { Injectable } from '@angular/core';
import { User } from './model/user';
import jwtDecode, { JwtPayload } from "jwt-decode";


interface DecodedToken extends JwtPayload {
  data: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #jwtToken: string = "";
  loggedIn: boolean = false;
  loggedUserDetails?: User = undefined;
  constructor() {
    this.#jwtToken = sessionStorage.getItem("token") || "";
    if (this.#jwtToken) {
      this.initLoggedState();
    }
  }

  set token(token: string) {
    this.#jwtToken = token;
  }

  get token(): string {
    return `Bearer ${this.#jwtToken}`;
  }

  authenticated(): boolean {
    return this.loggedIn;
  }

  login(token: string): void {
    sessionStorage.setItem("token", token);
    this.token = token;
    this.initLoggedState();
  }

  initLoggedState(): void {
    this.loggedIn = true;
    const decoded = jwtDecode<DecodedToken>(this.#jwtToken);
    this.loggedUserDetails = decoded.data;
  }

  logOut(): void {
    sessionStorage.removeItem("token");
    this.token = "";
    this.loggedIn = false;
    this.loggedUserDetails = undefined;
  }
}
