import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserInterface, LoginFormInterface } from '../../Interfaces/Interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = 'E-Mail address or password is incorrect !'
  isLoginFailed: boolean = false


  @Input() handleLoginClick!:() => void;
  @Input() user!: UserInterface | null;

  constructor(private userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
  }

  onClickSubmitUser(loginForm: LoginFormInterface) {
    this.userService.login(loginForm, this.updateUser)
  }

  updateUser(user: UserInterface | null = null) {
    console.log(this.isLoginFailed);
    this.user = user;
    if (this.user?.email) {
      this.handleLoginClick()
    } else {
      this.isLoginFailed = true;
    }
  }

}
