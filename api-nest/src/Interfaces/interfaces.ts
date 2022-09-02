import { User } from '../Schemas/user.schema'

export interface MetaInterface {
    method: string;
    urn: string;
    uri: string;
}
  
export interface FeatureInterface {
    title: string;
    url: string;
    method: string;
    description: string;
}

export interface FeaturesInterface {
    user: FeatureInterface[];
    task: FeatureInterface[];
    github: FeatureInterface[];
}

export interface TaskInterface {
    id?: string;
    user: User; 
    date: string,
    list?: string[],
    commits?: CommitInterface[]
}

export interface CommitInterface {
    url: string;
    hash: string;
}

export interface UserInterface {
    id?: string;
    lastName: string;
    firstName: string;
    email?: string;
    password?: string;
    job?: string;
    description?: string;
    photo?: string;
}
  
export interface GithubInterface {
    id: number;
    user: User;
    owner: string;
    repository: string;
    branch: string;
    enabled : boolean;
    token: string;
}

export interface NavigationItemInterface {
    id: number;
    label: string;
    title: string;
    path: string;
    isActive: boolean;
    componentId: string;
}

export interface IdInterface {
    id: string;
}
