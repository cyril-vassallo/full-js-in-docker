import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import format from 'date-fns/format'
import {
  TaskInterface,
  CommitInterface,
  UserInterface,
} from 'src/app/Interfaces/Interfaces';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  constructor() {}

  @Input() hasTask: boolean = false;
  @Input() tasks: TaskInterface[] | null = null;
  @Input() user: UserInterface | null = null;
  @Input() handleTaskState!: (
    tasks: TaskInterface[] | null,
    task: TaskInterface | null
  ) => void;

  task: TaskInterface | null = null;
  isTodayTaskExist: boolean = false;
  isValidCommit: boolean = true;
  date: string = format(new Date(), 'dd/MM/yyyy');
  userAgent: string = navigator.userAgent;

  taskForm = new FormGroup({
    taskInput: new FormControl(''),
  });

  commitForm = new FormGroup({
    commitHashInput: new FormControl(''),
    commitUrlInput: new FormControl(''),
  });

  ngOnInit(): void {
    console.log(this.date)
    this.isTodayTaskExist = this.checkIfTodayTaskExist(this.tasks, this.date);
    this.isTodayTaskExist ? (this.hasTask = true) : (this.hasTask = false);
  }

  onTaskFormSubmit(): void {
    this.isTodayTaskExist = this.checkIfTodayTaskExist(this.tasks, this.date);

    if (!this.isTodayTaskExist) {
      this.createTask();
    }

    this.task = this.updateTaskList(this.task, this.taskForm.value.taskInput);

    if (this.tasks !== null && this.task !== null && !this.isTodayTaskExist) {
      this.tasks = this.mergeTasks(this.tasks, this.task);
      this.hasTask = true;
    } else if (!this.tasks && this.task !== null) {
      this.tasks = [this.task];
    }

    this.handleTaskState(this.tasks, this.task);

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
      this.handleTaskState(this.tasks, this.task);
    } else {
      this.isValidCommit = false;
    }
    this.resetInputsState();
  }

  mergeTasks(tasks: TaskInterface[], task: TaskInterface): TaskInterface[] {
    tasks.unshift(task);
    return tasks;
  }

  checkIfTodayTaskExist(tasks: TaskInterface[] | null, date: string): boolean {
    if (tasks) {
      const todayTasks: TaskInterface[] = tasks.filter((task) => {
        return task.date == date;
      });

      if (todayTasks.length > 0) {
        console.log('TASK EXIST');
        this.task = todayTasks[0];
        return true;
      }
    }
    return false;
  }

  updateTaskList(
    task: TaskInterface | null,
    taskInputValue: string | null | undefined
  ): TaskInterface | null {
    if (
      task !== null &&
      taskInputValue !== null &&
      taskInputValue !== undefined &&
      taskInputValue !== ''
    ) {
      task.list.push(taskInputValue);
    }
    return task;
  }

  createTask(): void {
    if (this.tasks && this.taskForm.value.taskInput !== null) {
      const task: TaskInterface = this.tasks.reduce(function (
        accumulator: TaskInterface,
        currentTask: TaskInterface
      ) {
        return currentTask.id > accumulator.id ? currentTask : accumulator;
      },
      this.tasks[0]);

      const newTask: TaskInterface = { ...task };

      //transforme the last task into a today new task
      newTask.id = newTask.id + 1;
      newTask.commits = [];
      newTask.list = [];
      newTask.date = this.date;
      this.task = newTask;
    } else {
      if (this.user) {
        this.task = {
          id: 1,
          userId: this.user.id,
          date: this.date,
          commits: [],
          list: [],
        };
      }
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
}
