import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import format from 'date-fns/format'
import {
  TaskInterface,
  CommitInterface,
  UserInterface,
} from 'src/app/Interfaces/Interfaces';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit, OnDestroy {

  constructor(private taskService: TaskService) {}

  @Input() hasTask: boolean = false;
  @Input() tasks: TaskInterface[] | null = null;
  @Input() user: UserInterface | null = null;
  @Input() handleTasksState!: (
    tasks: TaskInterface[] | null,
    task: TaskInterface | null,
    isTodayTaskExist: boolean
  ) => void;

  task: TaskInterface | null = null;
  isTodayTaskExist: boolean = false;
  isValidCommit: boolean = true;
  date: string = format(new Date(), 'dd/MM/yyyy');
  userAgent: string = navigator.userAgent;
  lastCreatedTaskId: number| null = null;

  taskForm = new FormGroup({
    taskInput: new FormControl(''),
  });

  commitForm = new FormGroup({
    commitHashInput: new FormControl(''),
    commitUrlInput: new FormControl(''),
  });

  subscriptions: Subscription = new Subscription();

  // ----- Component lifecycle methods ----- //

  ngOnInit(): void {
    this.checkIfTodayTaskExist();
    this.isTodayTaskExist ? (this.hasTask = true) : (this.hasTask = false);
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }

// ----- Component methods ----- //

  onTaskFormSubmit(): void {
    this.checkIfTodayTaskExist();

    if (!this.isTodayTaskExist) {
      this.initializeNewTask();
    } 

    this.updateTaskList();

    if (this.tasks !== null && this.task !== null && !this.isTodayTaskExist) {
      this.tasks.unshift(this.task);
      this.hasTask = true;
    } else if (!this.tasks && this.task !== null) {
      this.tasks = [this.task];
    }

    this.handleTasksState(this.tasks, this.task, this.isTodayTaskExist);

    this.resetInputsState();
  }

  onCommitFormSubmit(): void {
    this.isValidCommit = this.checkIfCommitInputsAreValid();
    if (this.isValidCommit) {
      const commit: CommitInterface = {
        url: this.commitForm.value.commitUrlInput,
        hash: this.commitForm.value.commitHashInput,
      };
      this.task?.commits?.push(commit);
      this.handleTasksState(this.tasks, this.task, this.isTodayTaskExist);
    } else {
      this.isValidCommit = false;
    }
    this.resetInputsState();
  }

  checkIfTodayTaskExist(): void {
    if (this.tasks) {
      const todayTasks: TaskInterface[] = this.tasks.filter((task) => {
        return task.date == this.date;
      });

      if (todayTasks.length > 0) {
        console.log('TASK EXIST');
        this.task = todayTasks[0];
        this.isTodayTaskExist = true;
      }else {
        console.log('TASK DO NOT EXIST');
        this.isTodayTaskExist = false;
      }
    }
  
  }

  updateTaskList(): void {
    if (
      this.task?.list &&
      this.taskForm.value.taskInput
    ) {
      this.task.list.push(this.taskForm.value.taskInput);
    }
  }

  initializeNewTask(): void {
    if (this.user?.id && this.taskForm.value.taskInput !== null) {
      this.task = { 
        user: this.user.id,
        date: this.date,
        list: [],
        commits: []
      };
    }
  }

  resetInputsState(): void {
    this.taskForm.reset();
    this.commitForm.reset();
  }

  checkIfCommitInputsAreValid(): boolean {
    return (
      this.commitForm.value.commitHashInput !== null &&
      this.commitForm.value.commitHashInput !== undefined &&
      this.commitForm.value.commitHashInput !== '' &&
      this.commitForm.value.commitUrlInput !== null &&
      this.commitForm.value.commitUrlInput !== undefined &&
      this.commitForm.value.commitUrlInput !== ''
    );
  }

  getLastTaskIdFromDb(): void {
    //Mouve to initializeNewTask
    this.subscriptions.add(this.taskService.getLastCreatedTaskId().subscribe(( _observer => {
       this.lastCreatedTaskId  = _observer.data;
       console.log(this.lastCreatedTaskId)
    })));
  }

}
