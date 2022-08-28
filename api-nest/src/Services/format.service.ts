import { Injectable } from '@nestjs/common';
import { format } from 'date-fns'

@Injectable()
export class FormatService {

    constructor() {}
    
    public DateFrToEn (frDate: string): string  {
        return frDate.split('/').reverse().join('-');
    };
    
    public getTodayDate(local:string = 'fr'):  string {
        let date: string = '';
        switch (local.toLowerCase()) {
            case 'fr':
                date = format(new Date(), 'dd/MM/yyyy');
            break;
            case 'en':
                date = format(new Date(), 'yyyy/dd/MM');
            break;
            default:
                date = format(new Date(), 'dd/MM/yyyy');
        }
        return date;
    }

}