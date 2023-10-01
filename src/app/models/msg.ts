export class Msg {
    message:string;
    timestamp:Date;
    username:number;
    isImage: boolean;
    avatar:string;

    constructor(_message:string,_timestamp:Date,_username:number, _isimage:boolean, _avatar:string)
    {
        this.message = _message;
        this.timestamp = _timestamp;
        this.username = _username;
        this.isImage = _isimage;
        this.avatar=_avatar;
    }

}