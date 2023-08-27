import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../_models/users/RegisterUser';
import { Observable } from 'rxjs';
import { User } from '../_models/users/User';
import { LoginUser } from '../_models/users/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:5000/api/users/"

  user: User = {username: ""}

  public Register(user: RegisterUser): Observable<User>
  {
    return this.http.post(this.baseUrl + "register", user) as Observable<User>
  }

  public Login(user: LoginUser): Observable<User>
  {
    return this.http.post(this.baseUrl + "login", user) as Observable<User>;
  }

  public Logout()
  {
    this.user = {username: ""}
  }

  public SetOnlineUser(onlineUser: User)
  {
    this.user = onlineUser;
  }
  
  public GetOnlineUser()
  {
    return this.user;
  }
}
