import { User } from "./user";

export class Channel {

    chat:string;
    user:User;

    constructor(chat:string = '', user:User= new User()){

        this.chat = chat;
        this.user = user;

    
    }
    
}