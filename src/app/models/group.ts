import { Channel } from '../models/channel';

export class Group {
    name:string;
    admins:Array<string>


    constructor(name:string='', admins:Array<string>=[]){
       
        this.name = name;
        this.admins = admins;
    
    }
    
}