module.exports = async function (app,db) {

    app.post('/api/auth', async (req, res) => {     
        try {
            const usersCollection = db.collection('users');
            const users = await usersCollection.find({}).toArray();
            //console.log(users);
            const email = req.body.email;
            const password = req.body.password;     
            var customer = {};
            customer.id;
            customer.valid = false;
            customer.email = '';
            customer.username = '';
            customer.roles = [];
            customer.group = [];
    
            for (let i = 0; i < users.length; i++) {
                if (email == users[i].email && password == users[i].password) {
                    customer.id = users[i]._id;
                    customer.valid = true;
                    customer.email = users[i].email;
                    customer.username = users[i].username;
                    customer.roles = users[i].roles;
                    customer.group = users[i].group;
                }
            }
            res.send(customer);
            //console.log(customer);

        } catch (error) {
          console.error('Error querying the database:', error);
          res.sendStatus(500); // Handle the error appropriately
        }
      });
    }