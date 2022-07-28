export interface UserInterface {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  password: number| null;
  job: string;
  description: string;
  photo: string;
}


export interface ReturnedUserInterface {
  lastName: string;
  firstName: string;
  job: string;
  description: string;
  photo: string;
}
