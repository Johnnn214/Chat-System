export class Msg {
    channelid:any;
    message:string;
    timestamp:Date;
    username:number;
    image: boolean;
    avatar:string;

    constructor(_message:string,_timestamp:Date,_username:number, _image:boolean, _avatar:string, _channels:string)
    {
        this.message = _message;
        this.timestamp = _timestamp;
        this.username = _username;
        this.image = _image;
        this.avatar=_avatar;
        this.channelid = _channels;
    }

}