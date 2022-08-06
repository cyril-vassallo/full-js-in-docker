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
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    job: string;
    description: string;
    photo: string;
}
  
export interface ReturnedUserInterface {
    id: number;
    lastName: string;
    firstName: string;
    job: string;
    description: string;
    photo: string;
}
