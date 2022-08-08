import { Component, OnInit } from '@angular/core';
import {
  NavigationInterface,
  UserInterface,
  TaskInterface,
} from '../../Interfaces/Interfaces';
import { TaskService } from '../../services/task.service';
import { TasksAndMeta, UsersAndMeta } from '../../types/types';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  titleState: string = 'Login';

  isAuthState: boolean = false;

  userState: UserInterface | null = null;

  teamPartnerState: UserInterface | null = null;

  usersState: UserInterface[] | null = null;

  tasksState: TaskInterface[] | null = null;

  formDisplayState: boolean = false;

  navigationState: NavigationInterface[] = [
    {
      label: 'My History',
      path: '/my-history',
      isActive: true,
      title: 'Fill your information',
      componentId: 'app-my-history',
    },
    {
      label: 'My Settings',
      path: '/my-settings',
      isActive: false,
      title: 'Find here your history settings',
      componentId: 'app-my-setting',
    },
  ];

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.toggleFormState = this.toggleFormState.bind(this);
    this.assignNewTaskState = this.assignNewTaskState.bind(this);
    this.loadUserTasks = this.loadUserTasks.bind(this);
  }

  ngOnInit() {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      this.userState = JSON.parse(user);
      this.loadUser(this.userState);
      this.loadUsers(this.userState);
    }
  }

  onClickNavItem(event?: MouseEvent): void {
    console.log('Clicked nav item! ');
    console.log(event);
  }

  login(user: UserInterface | null): void {
    if (user != null) {
      this.loadUser(user);
      this.loadUsers(user);
      this.saveToLocalStorage('user', JSON.stringify(user));
    } else {
      this.initData();
    }
  }

  logout(): void {
    this.initData();
  }

  updateUserState(user: UserInterface | null) {
    if (user !== null) {
      this.userState = user;
    } else {
      this.userState = null;
    }
  }

  updateUsersState(users: UserInterface[] | null) {
    if (users !== null) {
      this.usersState = users;
    } else {
      this.usersState = null;
    }
  }

  loadUserTasks(user: UserInterface | null) {
    if (user !== null && this.isAuthState) {
      if (user != this.userState) {
        this.formDisplayState = false;
        this.teamPartnerState = { ...user };
      } else {
        this.teamPartnerState = null;
      }

      const tasksObservable$ = this.taskService.getTasksByUser(user);
      tasksObservable$.subscribe((_observer: TasksAndMeta) => {
        if (_observer.data && _observer.data.length > 0) {
          this.tasksState = _observer.data;
        } else {
          this.tasksState = null;
        }
      });
    }
  }

  initData(): void {
    this.titleState = 'Login';
    this.isAuthState = false;
    this.userState = null;
    this.tasksState = null;
    localStorage.removeItem('user');
  }

  loadUser(user: UserInterface | null): void {
    this.isAuthState = true;
    this.titleState = 'My History';
    this.updateUserState(user);
    this.loadUserTasks(user);
  }

  loadUsers(user: UserInterface | null): void {
    const userObservable$ = this.userService.getAllUsers();

    userObservable$.subscribe((_observer: UsersAndMeta) => {
      if (_observer.data && _observer.data.length > 0) {
        const data = _observer.data;

        this.usersState = data.filter((loopUser) => {
          return loopUser.firstName !== user?.firstName;
        });
      } else {
        this.usersState = null;
      }
    });
  }

  toggleFormState(): void {
    this.formDisplayState = !this.formDisplayState;
  }

  saveToLocalStorage(key: string, content: string) {
    localStorage.setItem(key, content);
  }

  assignNewTaskState(
    tasks: TaskInterface[] | null,
    task: TaskInterface | null
  ) {
    this.tasksState = tasks;
    if (task !== null) {
      this.taskService
        .postTask(task)
        .subscribe((tasksAndMeta: TasksAndMeta) => {
          this.tasksState = tasksAndMeta.data;
        });
    }
  }

  isFormShouldDisplayed(): boolean {
    return this.formDisplayState;
  }
}
