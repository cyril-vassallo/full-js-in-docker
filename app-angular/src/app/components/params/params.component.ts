import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from '../../Interfaces/Interfaces';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { TaskAndMeta } from '../../types/types';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private taskService: TaskService) { }


  @Input() user!: UserInterface|null;
  @Input() isFeatureActive: boolean = false;

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    job: new FormControl(''),
    description: new FormControl(''),
    photo: new FormControl('')
  })

  isUserUpdated: boolean = false;
  isHistoryClearing: boolean = false;
  isTodayTaskClearing: boolean = false;
  isAllAppTasksClearing: boolean = false;
  subscriptions: Subscription = new Subscription()

  // ----- Component lifecycle methods ----- //


  ngOnInit(): void {
    this.bindCurrentUserWithForm();
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }


  // ----- Component methods----- //

  bindCurrentUserWithForm(): void {
    if(this.user?.email) {
      this.userForm.controls.firstName.setValue(this.user?.firstName);
      this.userForm.controls.lastName.setValue(this.user?.lastName)
      this.userForm.controls.email.setValue(this.user?.email);
      this.userForm.controls.job.setValue(this.user?.job);
      this.userForm.controls.description.setValue(this.user?.description);
    }

  }

  onUserFormSubmit(): void {
      const userInfoFromInput: UserInterface = {
        id:  this.user?.id!,
        firstName: this.userForm.controls.firstName.value!,
        lastName:  this.userForm.controls.lastName.value!,
        email: this.userForm.controls.email.value!,
        job: this.userForm.controls.job.value!,
        description: this.userForm.controls.description.value!,
        photo: this.user?.photo!
      }

      this.subscriptions = this.userService.updateUser(userInfoFromInput).subscribe((_observer: UserInterface) => {
        this.user = _observer;
        this.userService.saveUserToLocalStorage(JSON.stringify(_observer));
        this.isUserUpdated = true;
        setTimeout(() => {
          this.isUserUpdated = false;
        }, 2000)
      })
  }

  onClearTodayTasksClick(): void {
    console.log("Clearing today Tasks....");
    if(this.user){
      this.subscriptions.add(this.taskService.deleteTodayTask(this.user).subscribe((_observer: TaskAndMeta) => {
        if(_observer?.hasOwnProperty('data')){
          console.log(_observer.data);
          this.isTodayTaskClearing = true;
          setTimeout(() => {
            this.isTodayTaskClearing = false;
          }, 2000)
        }
      }));
    }
  }

  onClearHistoryClick(): void {
    console.log("Clearing history....");
    if(this.user){
      this.subscriptions.add(this.taskService.deleteTasksByUser(this.user).subscribe((_observer: TaskAndMeta) => {
        if(_observer?.hasOwnProperty('data')){
          console.log(_observer.data);
          this.isHistoryClearing = true;
          setTimeout(() => {
            this.isHistoryClearing = false;
          }, 2000)
        }
      }));
    }
  }

  onClearAllAppTasksClick(): void {
    console.log("Clearing all app Tasks....");
    this.subscriptions.add(this.taskService.deleteAllAppTask().subscribe((_observer: TaskAndMeta) => {
      if(_observer?.hasOwnProperty('data')){
        console.log(_observer.data);
        this.isAllAppTasksClearing = true;
        setTimeout(() => {
          this.isAllAppTasksClearing = false;
        }, 2000)
      }
    }));
  }

}
