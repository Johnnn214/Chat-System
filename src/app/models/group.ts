import { Channel } from '../models/channel';

export class Group {
    name:string;

    channel: Array<Channel>;
    admins:Array<string>


    constructor(name:string='',channel:Array<Channel>=[], admins:Array<string>=[]){
       
        this.name = name;
        this.channel = channel;
        this.admins = admins;
    
    }
    
}