import { UserInterface, MetaInterface } from '../Interfaces/Interfaces';

export type UsersAndMeta = {
  data: UserInterface[];
  meta: MetaInterface;
};

export type UserAndMeta = {
  data: UserInterface;
  meta: MetaInterface;
};

