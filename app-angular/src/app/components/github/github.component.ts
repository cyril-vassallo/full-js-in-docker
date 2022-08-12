import { Component, OnInit, Input, createPlatform } from '@angular/core';
import { UserInterface, GithubInterface } from '../../Interfaces/Interfaces';
import { GithubService } from '../../services/github.service';
import { GithubAndMeta } from '../../types/types';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  @Input() user!: UserInterface|null;
  githubState: GithubInterface|null = null;
  enabled: boolean = false;
  hasError: boolean = false;
  githubForm = new FormGroup({
    owner: new FormControl(''),
    repository: new FormControl(''),
    branch: new FormControl(''),
    enabled: new FormControl(false),
  });

  constructor(private githubService: GithubService) { }

  async ngOnInit(): Promise<void> {
    this.initGithubState();
    this.checkRepository();
  }


  onGithubFormSubmit(): void {
    this.checkRepository();
    if(!this.hasError){
      this.updateRepository()
    }
  }


  initGithubState(): void{
    if(this.user){
      const githubObservable$ = this.githubService.getGithubByUser(this.user);
      githubObservable$.subscribe( (_observer: GithubAndMeta) => {
        this.githubState = {..._observer.data}
        this.updateFormValues()
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

  checkRepository(): void {
    if(this.githubState){
      this.githubState.owner = this.githubForm.controls.owner.value!;
      this.githubState.repository = this.githubForm.controls.repository.value!;
      this.githubState.branch = this.githubForm.controls.branch.value!;
      const githubCheckingObservable$ = this.githubService.checkGithubRepository(this.githubState)
      githubCheckingObservable$
        .pipe(catchError(err => of({status : err.status})))
        .subscribe( (resp: any) => {
          console.log(resp)
          resp.status === 404 || resp.status === 403  ? this.hasError = true : this.hasError = false
      } )
    }
  }

  updateRepository(): void {
    //to do backend
  }
  

}
