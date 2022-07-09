import { PersonInterface } from '../Interfaces/person.interface';
import { FeatureInterface } from '../Interfaces/feature.interface';
import { MetaInterface } from '../Interfaces/meta.interface';

export type PersonsAndMeta = {
  data: PersonInterface[];
  meta: MetaInterface;
};

export type FeaturesAndMeta = {
  data: FeatureInterface[];
  meta: MetaInterface;
};
