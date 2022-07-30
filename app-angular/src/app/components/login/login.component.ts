import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TaskService } from 'src/app/services/task.service';
import { LoginFormInterface, UserInterface, TaskInterface } from '../../Interfaces/Interfaces';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
  errorMsg: string = '';
  tasks: TaskInterface[]|null = null;
  
  @Input() handleLogin!:(user: UserInterface|null) => void;
  @Input() handleTasksList!: (tasks: TaskInterface[]|null) => void; 
  @Input() user!: UserInterface|null;

  constructor(private userService: UserService, private taskService: TaskService ) {
    this.userService = userService;
  }

  ngOnInit(): void {
  }

  onSubmitLogin(loginForm: LoginFormInterface) {
    const UserAndMeta$ = this.userService.login(loginForm)
      .pipe(
        catchError(error => {
            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
                console.log(this.errorMsg)
            } else {
                this.errorMsg = `Error: ${error.message}`;
                console.log(this.errorMsg)
            }
            return of([]);
        })
    );


    UserAndMeta$.subscribe((_observer: any) => {
        if(_observer.data) {
          this.isLoginFailed = false 
          this.user = _observer.data
          this.handleLogin(this.user)
        }else {
          this.isLoginFailed = true
        }
    });

  }

}
