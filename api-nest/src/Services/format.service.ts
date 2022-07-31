import { Injectable } from '@nestjs/common';

@Injectable()
export class FormatService {

    constructor() {}
    
    public DateFrToEn (frDate: string): string  {
        return frDate.split('/').reverse().join('-');
    };
    
}