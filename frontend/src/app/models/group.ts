import { Channel } from '../models/channel';

export class Group {
    name:string;
    admins:Array<string>
  _id: any;


    constructor(name:string='', admins:Array<string>=[]){
       
        this.name = name;
        this.admins = admins;
    
    }
    
}