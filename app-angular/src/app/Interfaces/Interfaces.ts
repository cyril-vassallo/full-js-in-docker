import { Component } from '@angular/core';
export interface NavigationInterface {
    label: string;
    path: string;
    isActive : boolean;
    title: string;
    componentId: string;
}

export interface UserInterface {
    firstName: string;
    lastName: string;
    job: string;
    photo: string;
    description: string
}

export interface TaskInterface {
    date: string,
    list: string [],
    commits: Commit[]
}

export interface LoginFormInterface {
    email: string;
    password: string;
}

export interface MetaInterface {
  urn: string;
  uri: string;
}

export interface Commit {
    url: string;
    hash: string;
}
