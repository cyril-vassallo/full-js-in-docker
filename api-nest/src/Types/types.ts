import { UserInterface } from '../Interfaces/user.interface';
import { FeatureInterface } from '../Interfaces/feature.interface';
import { MetaInterface } from '../Interfaces/meta.interface';

export type UsersAndMeta = {
  data: UserInterface[];
  meta: MetaInterface;
};

export type UserAndMeta = {
  data: UserInterface;
  meta: MetaInterface;
};

export type FeaturesAndMeta = {
  data: FeatureInterface[];
  meta: MetaInterface;
};
