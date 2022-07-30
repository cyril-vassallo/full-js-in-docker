import { Injectable } from '@nestjs/common';

@Injectable()
export class FormateService {

    constructor() {}
    
    public DateFrToEn (frDate: string): string  {
        return frDate.split('/').reverse().join('-');
    };
    
}