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
    
            customer.group = "";
            customer.username = "";

            
            const userNamesWithGroup = [];
    
            for (const obj of users) {
              if (obj.group.includes(req.body.group) ) {
                userNamesWithGroup.push({ "username": obj.username,
                "email": obj.email,
                "roles": obj.roles,
                 "group": obj.group,
                "valid": obj.valid });
              }
            }
            
            console.log("users", userNamesWithGroup);

            res.send(userNamesWithGroup);
            // res.send(users);
            // res.send(customer);
            // console.log(customer);
            
            }catch(err){
              console.log("Error pasing the userdata");
            }
           })
    

}