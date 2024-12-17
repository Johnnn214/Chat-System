
export class User {
    username:string;
    email:string;
    _id?:string;
    password:string;
    roles:Array<string>;
    group:Array<string>;
    valid:boolean;
    avatar:string;

    constructor(username:string='', email:string='',_id:string="",avatar:string="",
    password:string='',roles:Array<string>=[],group:Array<string>=[],valid:boolean=false){
        
        this.avatar = avatar;
        this.username = username;
        this.email = email;
        this.password = password;
        this._id = _id;
        this.roles = roles;
        this.group = group;
        this.valid = valid;
    
    }
    
}