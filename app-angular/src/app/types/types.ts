import {
  MetaInterface,
  UserInterface,
  TaskInterface,
  GithubInterface
} from '../Interfaces/Interfaces';

export type UsersAndMeta = {
  data: UserInterface[];
  meta: MetaInterface;
};

export type UserAndMeta = {
  data: UserInterface;
  meta: MetaInterface;
};

export type TasksAndMeta = {
  data: TaskInterface[];
  meta: MetaInterface;
};

export type TaskAndMeta = {
  data: TaskInterface;
  meta: MetaInterface;
};

export type GithubAndMeta = {
  data: GithubInterface;
  meta: MetaInterface;
};

