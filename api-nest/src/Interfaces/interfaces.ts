export interface MetaInterface {
    urn: string;
    uri: string;
}
  
export interface FeatureInterface {
    title: string;
    url: string;
    description: string;
}

export interface TaskInterface {
    id: number;
    userId: number; 
    date: string,
    list: string [],
    commits: CommitInterface[]
}

export interface CommitInterface {
    url: string;
    hash: string;
}

export interface UserInterface {
    id: string;
    lastName: string;
    firstName: string;
    email?: string;
    password?: string;
    job: string;
    description: string;
    photo: string;
}
  
export interface GithubInterface {
    id: number;
    userId: number;
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