import { Channel } from './channel';

export class Group {
    name:string;
    admins:Array<string>
    _id: any;


    constructor(name:string='', admins:Array<string>=[], _id:any){
       
        this.name = name;
        this.admins = admins;
        this._id = _id;
    
    }
}