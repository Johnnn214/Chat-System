import { Channel } from '../models/channel';

export class Group {
    name:string;

    channel: Array<string>;
    admins:Array<string>


    constructor(name:string='',channel:Array<string>=[], admins:Array<string>=[]){
       
        this.name = name;
        this.channel = channel;
        this.admins = admins;
    
    }
    
}