
export class User {
    username:string;
    email:string;
    id:string;
    password:string;
    roles:Array<string>;
    group:Array<string>;
    valid:boolean;

    constructor(username:string='', email:string='',id:string="",
    password:string='',roles:Array<string>=[],group:Array<string>=[],valid:boolean=false){
       
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = id;
        this.roles = roles;
        this.group = group;
        this.valid = valid;
    
    }
    
}