import { Channel } from '../models/channel';

export class Group {
    name:string;
    id:string;
    channel: Array<string>;
    admin:Array<string>


    constructor(name:string='', id:string="",channel:Array<string>=[], admin:Array<string>=[]){
       
        this.name = name;
        this.id = id;
        this.channel = channel;
        this.admin =admin;
    
    }
    
}