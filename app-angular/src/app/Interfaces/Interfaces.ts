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
    password: string;
    email: string;
    job: string;
    photo: string;
    description: string
}

export interface TaskInterface {
    list: string [],
    date: string,
    commitHashes: string[]
}

export interface LoginFormInterface {
    email: string;
    password: string;
}

export interface MetaInterface {
  urn: string;
  uri: string;
}
