import { Channel } from '../models/channel';

export class Group {
    name:string;
    id:string;
    channel: Array<Channel>;
  admin: any;

    constructor(name:string='', id:string="",channel:Array<Channel>=[]){
       
        this.name = name;
        this.id = id;
        this.channel = channel;
    
    }
    
}