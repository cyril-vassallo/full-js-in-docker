
export interface NavigationItemInterface {
    id: number;
    label: string;
    title: string;
    path: string;
    isActive: boolean;
    componentId: string;
}

export interface UserInterface {
    id: number;
    firstName: string;
    lastName: string;
    job: string;
    photo: string;
    description: string
}

export interface TaskInterface {
    date: string,
    list: string [],
    commits: CommitInterface[]
}

export interface LoginFormInterface {
    email: string;
    password: string;
}

export interface MetaInterface {
  urn: string;
  uri: string;
}

export interface CommitInterface {
    url: string|null|undefined;
    hash: string|null|undefined;
}

export interface TaskInterface {
    id: number;
    userId: number; 
    date: string,
    list: string [],
    commits: CommitInterface[]
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

