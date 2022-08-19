import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserInterface } from '../../Interfaces/Interfaces';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }


  @Input() user!: UserInterface|null;
  @Input() isFeatureActive: boolean = false;

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    job: new FormControl(''),
    description: new FormControl(''),
    photo: new FormControl('')
  })

  isUserUpdated: boolean = false;
  userUpdateSubscription$: Subscription | null = null;

  ngOnInit(): void {
    this.bindCurrentUserWithForm();
  }


  ngOnDestroy(): void {
    this.userUpdateSubscription$?.unsubscribe();
  }


  bindCurrentUserWithForm(): void {
    if(this.user) {
      this.userForm.controls.firstName.setValue(this.user?.firstName);
      this.userForm.controls.lastName.setValue(this.user?.lastName)
      this.userForm.controls.job.setValue(this.user?.job);
      this.userForm.controls.description.setValue(this.user?.description);
    }

  }

  onUserFormSubmit(): void {
      const userInfoFromInput: UserInterface = {
        id:  this.user?.id!,
        firstName: this.userForm.controls.firstName.value!,
        lastName:  this.userForm.controls.lastName.value!,
        job: this.userForm.controls.job.value!,
        description: this.userForm.controls.description.value!,
        photo: this.user?.photo!
      }

      this.userUpdateSubscription$ = this.userService.updateUser(userInfoFromInput).subscribe((_observer: any) => {
        if(_observer?.hasOwnProperty('data')){
          this.user = _observer.data;
          this.userService.saveUserToLocalStorage(JSON.stringify(_observer.data));
          this.isUserUpdated = true;
          setTimeout(() => {
            this.isUserUpdated = false;
          }, 2000)
        }
      })
  
  }


  

}
