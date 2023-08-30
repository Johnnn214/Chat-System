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
    
            customer.valid = false;
            customer.email = '';
            customer.username = '';
            customer.roles = [];
            customer.group = [];
    
            for (let i = 0; i < users.length; i++) {
                if (req.body.email == users[i].email && req.body.password == users[i].password) {
                    customer.valid = true;
                    customer.email = users[i].email;
                    customer.username = users[i].username;
                    customer.roles = users[i].roles;
                    customer.group = users[i].group;
                }
            }
            res.send(customer);
            console.log(customer);
            
            }catch(err){
              console.log("Error pasing the userdata");
            }
           })
    

}