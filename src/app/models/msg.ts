export class Msg {
    message:string;
    timestamp:Date;
    username:number;

    constructor(_message:string,_timestamp:Date,_username:number)
    {
        this.message = _message;
        this.timestamp = _timestamp;
        this.username = _username;
    }

}