var fs = require('fs');

module.exports = function (req, res) {
        if (!req.body) {
            return res.sendStatus(400)
        }
        fs.readFile('../server/data/groups.json','utf8',(err,data)=>{
            if (err) {
                console.error(err)
                return
            }

            try{
            console.log(data);
            let groups = JSON.parse(data);
            groups = groups.groups;
            console.log(groups);
    
            
            res.send(groups);
         
            
            }catch(err){
              console.log("Error pasing the userdata");
            }
           })
}