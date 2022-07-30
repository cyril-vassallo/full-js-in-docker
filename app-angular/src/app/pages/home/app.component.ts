import { Component , OnInit } from '@angular/core';
import { NavigationInterface, UserInterface, TaskInterface } from '../../Interfaces/Interfaces';
import { TaskService } from '../../services/task.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  
  titleState: string = 'Login';

  isAuthState: boolean = false;

  userState: UserInterface|null = null;

  tasksState: TaskInterface[] | null = null;
  
  isFormDisplayed: boolean = false;

  navigationState: NavigationInterface[] = [
    {
      label: "My History",
      path: "/my-history",
      isActive: true,
      title: 'Fill your information',
      componentId: 'app-my-history'
    },
    {
      label: "My Team",
      path: "/my-team",
      isActive: false,
      title: 'Find my team partner history',
      componentId: 'app-my-team'
    },
  ];


  constructor(private taskService: TaskService) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.toggleFormState = this.toggleFormState.bind(this);
    this.assignNewTaskState = this.assignNewTaskState.bind(this);
  }


  ngOnInit() {
    const user: string|null = localStorage.getItem('user');
    if (user) {
      this.userState = JSON.parse(user);
      this.loadUser(this.userState);
    };
  }

  onClickNavItem(event?: MouseEvent): void {
    console.log('Clicked nav item! ');
    console.log(event);
  }

  login(user: UserInterface|null): void {
    if (user != null) {
      this.loadUser(user)
      this.saveToLocalStorage("user", JSON.stringify(user))
    } else {
      this.initData()
    }
  }

  logout(): void {
    this.initData()
  }

  updateUserState(user: UserInterface|null) {
    if(user !== null){
      this.userState = user;
    } else {
      this.userState = null;
    }
  }

  loadUserTasks() {
    if (this.userState !== null && this.isAuthState) {
      const tasksObservable$ = this.taskService.getTasksByUser(this.userState)
      tasksObservable$.subscribe((_observer: any) => {
        if (_observer.data && _observer.data.length > 0) {
          this.tasksState = _observer.data
        } else {
          this.tasksState = null
        }
      })
    }

  }

  initData(): void {
    this.titleState = 'Login';
    this.isAuthState = false;
    this.userState = null;
    this.tasksState = null;
    localStorage.removeItem('user')
  }

  loadUser(user: UserInterface | null): void {
    this.isAuthState = true;
    this.titleState = 'My dev History'
    this.updateUserState(user);
    this.loadUserTasks();
  }

  toggleFormState(): void {
    this.isFormDisplayed = !this.isFormDisplayed;
  }

  saveToLocalStorage(key: string, content: string) {
    localStorage.setItem(key, content);
  }

  assignNewTaskState(tasks: TaskInterface[] | null) {
    console.log('TASKS UPDATED');
    this.tasksState = tasks;
    console.log(this.tasksState);
  }

}
