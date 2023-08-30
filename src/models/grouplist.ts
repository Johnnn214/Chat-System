
export class Group {
    name:string;
    id:string;
    channel: Array<string>;

    constructor(name:string='', id:string="",channel:Array<string>=[]){
       
        this.name = name;
        this.id = id;
        this.channel = channel;
    
    }
    
}