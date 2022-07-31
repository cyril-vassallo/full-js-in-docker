import { ReturnedUserInterface, TaskInterface, MetaInterface, FeatureInterface  } from '../Interfaces/interfaces';


export type FeaturesAndMeta = {
  data: FeatureInterface[];
  meta: MetaInterface;
};

export type UsersAndMeta = {
  data: ReturnedUserInterface[];
  meta: MetaInterface;
};

export type UserAndMeta = {
  data: ReturnedUserInterface;
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


