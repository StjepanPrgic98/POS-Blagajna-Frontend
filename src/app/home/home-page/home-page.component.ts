import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from 'src/app/_models/users/LoginUser';
import { RegisterUser } from 'src/app/_models/users/RegisterUser';
import { User } from 'src/app/_models/users/User';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private toastr: ToastrService, private userService: UserService){}

  isRegistering: boolean = false

  newUser: RegisterUser = {email: "", username: "", password: ""}
  confirmPassword: string = ""
  abortRegister: boolean = false

  loginUser: LoginUser = {email: "", password: ""}

  onlineUser: User | undefined

  abortLogin: boolean = false

  ngOnInit()
  {
    if(this.userService.GetOnlineUser().username == ""){return;}
    this.onlineUser = this.userService.GetOnlineUser();
  }

  StartRegistering()
  {
    this.isRegistering = true
  }


  Register()
  {
    this.ValidateNewUser()

    if(this.abortRegister){return;}

    this.userService.Register(this.newUser).subscribe(
      {
        next: response => 
        {
          this.toastr.success("New user created", "Success!"), 
          this.ResetUserObjects(), 
          this.userService.SetOnlineUser(response),
          this.onlineUser = response
        },
        error: error => {console.log(error), this.toastr.error("Failed to register user", "Warning!")}
      })
  }

  ValidateNewUser()
  {
    this.abortRegister = false

    if(this.newUser.email == "" || this.newUser.email == null || this.newUser.email == undefined){this.toastr.error("Enter email!", "Warning!"), this.abortRegister = true}
    if(this.newUser.password == "" || this.newUser.password == null || this.newUser.password == undefined){this.toastr.error("Enter password!", "Warning!"), this.abortRegister = true}
    if(this.newUser.username == "" || this.newUser.username == null || this.newUser.username == undefined){this.toastr.error("Enter username!", "Warning!"), this.abortRegister = true}
    if(this.confirmPassword == "" || this.confirmPassword == null || this.confirmPassword == undefined){this.toastr.error("Confirm password!", "Warning!"), this.abortRegister = true}

    if(this.newUser.password != this.confirmPassword)
    {
      this.toastr.error("Passwords do not match", "Warning"); 
      this.abortRegister = true; 
      return
    }
  }

  ValidateLoginUser()
  {
    this.abortLogin = false
    if(this.loginUser.email == "" || this.loginUser.email == null || this.loginUser.email == undefined){this.abortLogin = true, this.toastr.error("Enter email!", "Warning")}
    if(this.loginUser.password == "" || this.loginUser.password == null || this.loginUser.password == undefined){this.abortLogin = true, this.toastr.error("Enter password!", "Warning")}
  }

  ResetUserObjects()
  {
    this.newUser = {email: "", username: "", password: ""}
    this.loginUser = {email: "", password: ""}
    this.confirmPassword = ""
  }

  Login()
  {
    this.ValidateLoginUser()

    if(this.abortLogin){return;}

    this.userService.Login(this.loginUser).subscribe(
      {
        next: response => 
        {
          this.onlineUser = response,
          this.userService.SetOnlineUser(response),
          this.toastr.success("Login successful", "Success!"),
          this.ResetUserObjects()
        },
        error: error => {console.log(error), this.toastr.error("Failed to login", "Warning!")}
      })
  }

  Logout()
  {
    this.userService.Logout();
    this.onlineUser = undefined;
  }
}
