import {
  UserInterface,
  TaskInterface,
  MetaInterface,
  FeatureInterface,
  GithubInterface,
  NavigationItemInterface
} from '../Interfaces/interfaces';

export type FeaturesAndMeta = {
  data: FeatureInterface[];
  meta: MetaInterface;
};

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

export type StateAndMeta = {
  data: string;
  meta: MetaInterface;
};

export type GithubAndMeta = {
  data: GithubInterface;
  meta: MetaInterface;
};


export type NavigationAndMeta = {
  data: NavigationItemInterface[];
  meta: MetaInterface;
};

