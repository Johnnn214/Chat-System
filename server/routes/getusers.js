var fs = require('fs');

module.exports = function (req, res) {
        if (!req.body) {
            return res.sendStatus(400)
        }
        fs.readFile('../server/data/user.json','utf8',(err,data)=>{
            if (err) {
                console.error(err)
                return
            }

            try{
            console.log(data);
            let users = JSON.parse(data);
            users = users.users;
            console.log(users);
         
            var customer = {};
    
            customer.roles = "";
            customer.username = "";

            
            const userNamesWithRole = [];
    
            for (const obj of users) {
              if (obj.roles === req.body.roles ) {
                userNamesWithRole.push({ "username": obj.username });
              }
            }
            
            console.log(userNamesWithRole);

            // res.send(userNamesWithRole);
            res.send(users);
            // res.send(customer);
            // console.log(customer);
            
            }catch(err){
              console.log("Error pasing the userdata");
            }
           })
    

}