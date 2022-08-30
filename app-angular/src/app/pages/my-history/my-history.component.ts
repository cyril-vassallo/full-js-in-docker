import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UserInterface,
  TaskInterface,
  GithubInterface
} from '../../Interfaces/Interfaces';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { GithubService } from '../../services/github.service';
import { TaskAndMeta, TasksAndMeta } from '../../types/types';
import { Subscription, of } from 'rxjs';




@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.scss'],
})
export class MyHistoryComponent implements OnInit, OnDestroy {
  titleState: string = 'Login';

  isAuthState: boolean = false;

  userState: UserInterface | null = null;

  teamPartnerState: UserInterface | null = null;

  usersState: UserInterface[] | null = null;

  tasksState: TaskInterface[] | null = null;

  githubState: GithubInterface | null = null;

  formDisplayState: boolean = false;

  subscriptions: Subscription = new Subscription();  


  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private githubService: GithubService,
  ) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.updateTasksState = this.updateTasksState.bind(this);
    this.toggleFormState = this.toggleFormState.bind(this);
    this.loadUserTasks = this.loadUserTasks.bind(this);
    this.syncGitTasks = this.syncGitTasks.bind(this)
  }

  // ----- Component lifecycle methods ----- //

  ngOnInit() {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      this.userState = JSON.parse(user);
      this.loadUser();
      this.loadUsers();
      this.loadUserGithub();
    }
  }

  ngOnDestroy(): void  {
    this.subscriptions?.unsubscribe();
  }


// ----- Component methods ----- //

  loadUser(): void {
    this.isAuthState = true;
    this.titleState = 'My History';
    this.updateUserState();
    this.loadUserTasks();
  }

  loadUsers(): void {
    this.subscriptions.add(this.userService.getAllUsers().subscribe((_observer: UserInterface[]) => {
      const data = _observer;
      this.usersState = data.filter((loopUser: UserInterface) => {
        return loopUser.firstName !== this.userState?.firstName;
      });
    }));
  }

  loadUserGithub(): void  {
    console.log('user github loaded !');
    if(this.userState !== null) {
      this.subscriptions.add(this.githubService.getGithubByUser(this.userState).subscribe((_observer: GithubInterface|null) => {
        this.githubState = _observer;
      }));
    }
  }

  initStates(): void {
    this.titleState = 'Login';
    this.isAuthState = false;
    this.userState = null;
    this.tasksState = null;
    this.githubState =  null;
    localStorage.removeItem('user');
  }

  updateUsersState(users: UserInterface[] | null) {
    if (users !== null) {
      this.usersState = users;
    } else {
      this.usersState = null;
    }
  }

  isFormShouldDisplayed(): boolean {
    return this.formDisplayState;
  }

  onClickNavItem(event?: MouseEvent): void {
    console.log('Clicked nav item! ');
    //TODO: check user.role 
  }

  saveToLocalStorage(key: string, content: string) {
    localStorage.setItem(key, content);
  }

  // ----- Child component triggered methods ----- //

  login(user: UserInterface | null): void {
    if (user != null) {
      this.loadUser();
      this.loadUsers();
      this.userService.saveUserToLocalStorage(JSON.stringify(user));
    } else {
      this.initStates();
    }
  }

  logout(): void {
    this.initStates();
  }

  updateUserState() {
    if (this.userState !== null) {
      this.userState = this.userState;
    } else {
      this.userState = null;
    }
  }

  updateTasksState(
    tasks: TaskInterface[]|null,
    task: TaskInterface|null,
    isTodayTaskExist: boolean
  ) {
    switch (isTodayTaskExist) {
      case true:
        if (task !== null) {
          this.subscriptions.add(this.taskService.updateTask(task).subscribe((_observer: TaskAndMeta) => {
            task.id = _observer.data.id;
            this.tasksState = tasks;
          }));
        } 
        break
      case false:
        if (task !== null) {
          this.subscriptions.add(this.taskService.postTask(task).subscribe((_observer: TaskAndMeta) => {
            task.id = _observer.data.id;
            console.log(task)
            this.tasksState = tasks;
            console.log(this.tasksState);
          }));
        }
        break
    }
  }

  toggleFormState(): void {
    this.formDisplayState = !this.formDisplayState;
  }

  loadUserTasks() {
    if (this.userState !== null && this.isAuthState) {
      if (this.userState != this.userState) {
        this.formDisplayState = false;
        this.teamPartnerState = { ...this.userState };
      } else {
        this.teamPartnerState = null;
      }

      this.subscriptions.add(this.taskService.getTasksByUser(this.userState).subscribe((_observer: TasksAndMeta) => {
        if (_observer.data && _observer.data.length > 0) {
          this.tasksState = _observer.data;
        } else {
          this.tasksState = null;
        }
      }));
    }
  }

  syncGitTasks(): void  {
    console.log('sync...');
    console.log(this.githubState);
    //TODO: parse all commits and message from github api and update tasksSate
  }

}
