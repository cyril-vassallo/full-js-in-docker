import { ReturnedUserInterface } from '../Interfaces/user.interface';
import { FeatureInterface } from '../Interfaces/feature.interface';
import { MetaInterface } from '../Interfaces/meta.interface';

export type UsersAndMeta = {
  data: ReturnedUserInterface[];
  meta: MetaInterface;
};

export type UserAndMeta = {
  data: ReturnedUserInterface;
  meta: MetaInterface;
};

export type FeaturesAndMeta = {
  data: FeatureInterface[];
  meta: MetaInterface;
};
