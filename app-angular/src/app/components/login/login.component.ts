import { Component, Input, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {
  LoginFormInterface,
  UserInterface,
  TaskInterface,
} from '../../Interfaces/Interfaces';
import { Subscription } from 'rxjs';
import { UserAndMeta } from '../../types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  email: string = '';
  password: string = '';
  errorMessage: string = 'E-Mail address or password is incorrect !';
  isLoginFailed: boolean = false;
  errorMsg: string = '';
  tasks: TaskInterface[] | null = null;

  @Input() handleLogin!: (user: UserInterface | null) => void;
  @Input() handleTasksList!: (tasks: TaskInterface[] | null) => void;
  @Input() user!: UserInterface | null;

  subscriptions: Subscription = new Subscription();

  constructor(private userService: UserService) {
    this.userService = userService;
  }


  // ----- Component lifecycle methods ----- //
 
  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

  // ----- Component methods----- //

  onSubmitLogin(loginForm: LoginFormInterface) {
    this.subscriptions.add(this.userService.login(loginForm).subscribe((_observer: UserInterface) => {
      this.isLoginFailed = false;
      this.user = _observer;
      this.handleLogin(this.user);
    }));
  }


}
