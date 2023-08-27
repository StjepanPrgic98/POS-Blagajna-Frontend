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
    if(this.newUser.password != this.confirmPassword)
    {
      this.toastr.error("Passwords do not match", "Warning"); 
      this.abortRegister = true; 
      return
    }
  }

  ResetUserObjects()
  {
    this.newUser = {email: "", username: "", password: ""}
    this.loginUser = {email: "", password: ""}
    this.confirmPassword = ""
  }

  Login()
  {
    console.log(this.loginUser)
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
