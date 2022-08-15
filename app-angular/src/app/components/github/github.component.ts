import { Component, OnInit, Input, createPlatform } from '@angular/core';
import { UserInterface, GithubInterface } from '../../Interfaces/Interfaces';
import { GithubService } from '../../services/github.service';
import { GithubAndMeta } from '../../types/types';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, map} from 'rxjs/operators';
import { of, Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  @Input() user!: UserInterface|null;
  githubState: GithubInterface|null = null;
  enabled: boolean = false;
  hasError: boolean = true;
  githubForm = new FormGroup({
    owner: new FormControl(''),
    repository: new FormControl(''),
    branch: new FormControl(''),
    enabled: new FormControl(false),
  });

  githubObservable$: Observable<GithubAndMeta>|null = null
  githubCheckingObservable$: Observable<GithubAndMeta>|null = null
  githubUpdateObservable$: Observable<GithubAndMeta>|null = null
  gitUpdateSubscription$: Subscription| null = null;
  gitCheckingSubscription$: Subscription| null = null;
  gitGetByUserSubscription$: Subscription| null = null;

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.initGithubState();
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if(this.gitUpdateSubscription$) this.gitUpdateSubscription$.unsubscribe();
    if(this.gitCheckingSubscription$) this.gitCheckingSubscription$.unsubscribe();
    if(this.gitGetByUserSubscription$) this.gitGetByUserSubscription$.unsubscribe();
  }
  
  onGithubFormSubmit(): void {
    this.checkRepository();
    if(!this.hasError){
      this.updateRepository() 
    }
  }

  initGithubState(): void{
    if(this.user){
      this.githubObservable$ = this.githubService.getGithubByUser(this.user);
      this.gitGetByUserSubscription$ = this.githubObservable$.subscribe( (_event: GithubAndMeta) => {
        console.log('GET GIT')
        this.githubState = {..._event.data}
        this.updateFormValues();
        this.checkRepository();
      })
    }
  }

  updateFormValues(): void {
    if(this.githubState !== undefined && this.githubState !== null){
      this.githubForm.setValue({
        owner: this.githubState.owner ?? '',
        repository: this.githubState.repository ?? '',
        branch: this.githubState.branch ?? '',
        enabled: this.githubState.enabled ?? false
      })
    }

    if(this.githubState?.enabled) {
      this.githubForm.controls.owner.enable();
      this.githubForm.controls.repository.enable();
      this.githubForm.controls.branch.enable();
    } else {
      this.githubForm.controls.owner.disable();
      this.githubForm.controls.repository.disable();
      this.githubForm.controls.branch.disable();
    }

  } 

  isGithubActive() {
    return this.githubForm.get('enabled')?.getRawValue()
  }

  onEnableCLick() {
    this.toggleGithubEnabling()
    if(this.githubForm.controls.enabled.value 
      && this.githubForm.controls.owner.value !=='' 
      && this.githubForm.controls.repository.value !=='' 
      && this.githubForm.controls.branch.value !==''
    )
    {
      this.checkRepository();
    }else {
      if(this.githubForm.controls.enabled.value) {
        this.hasError = true
      }
     
    }
  }

  toggleGithubEnabling(): void {  
    const enabled: boolean = !this.githubForm.controls.enabled.value;
    if(enabled) {
      this.githubForm.controls.owner.enable();
      this.githubForm.controls.repository.enable();
      this.githubForm.controls.branch.enable();
    } else {
      this.githubForm.controls.owner.disable();
      this.githubForm.controls.repository.disable();
      this.githubForm.controls.branch.disable();
    }
  }

  checkRepository(): any {
    if(this.githubState){

      this.githubState.owner = this.githubForm.controls.owner.value!;
      this.githubState.repository = this.githubForm.controls.repository.value!;
      this.githubState.branch = this.githubForm.controls.branch.value!;
      
      this.githubCheckingObservable$ = this.githubService.checkGithubRepository(this.githubState)
      this.gitCheckingSubscription$ = this.githubCheckingObservable$
        .pipe(
          catchError(err => of({status : err.status}))
        )
        .subscribe( (_event: any) => {
          console.log('CHECK GIT');
          _event.status === 404 || _event.status === 403  ? this.hasError = true : this.hasError = false
      })
    }
  }

  updateRepository(): void {
    if(this.githubState && this.user && !this.hasError){

      this.githubState.userId =  this.user?.id;
      this.githubState.enabled = true;
      this.githubState.owner = this.githubForm.controls.owner.value!;
      this.githubState.repository = this.githubForm.controls.repository.value!;
      this.githubState.branch = this.githubForm.controls.branch.value!;

      this.githubUpdateObservable$ = this.githubService.postGithub(this.githubState)
      this.gitUpdateSubscription$ = this.githubUpdateObservable$
        .pipe(catchError(err => of({status : err.status})))
        .subscribe( (_event: any) => {
          console.log('UPDATE GIT')
          console.log(_event)
          _event.status === 404 || _event.status === 403  ? this.hasError = true : this.hasError = false
      } )
    }
  }



}
