import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  LoginFormInterface,
  UserInterface,
  TaskInterface,
} from '../../Interfaces/Interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  errorMessage: string = 'E-Mail address or password is incorrect !';
  isLoginFailed: boolean = false;
  errorMsg: string = '';
  tasks: TaskInterface[] | null = null;

  @Input() handleLogin!: (user: UserInterface | null) => void;
  @Input() handleTasksList!: (tasks: TaskInterface[] | null) => void;
  @Input() user!: UserInterface | null;

  loginUserSubscription$ : Subscription| null = null;

  constructor(
    private userService: UserService,
  ) {
    this.userService = userService;
  }

  ngOnInit(): void {}

  onSubmitLogin(loginForm: LoginFormInterface) {
    this.loginUserSubscription$ = this.userService.login(loginForm).subscribe((_observer: any) => {
      if (_observer.data) {
        this.isLoginFailed = false;
        this.user = _observer.data;
        this.handleLogin(this.user);
      } else {
        this.isLoginFailed = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.loginUserSubscription$?.unsubscribe();
  }
}
