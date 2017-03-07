//equal to IFFI pattern in server side
module.exports = function(app){
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser)

    var users= [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder" },
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley" },
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia" },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi" }
    ];

    function deleteUser(req, res){
        var userId = req.params.userId;
        for (var u in users){
            if (users[u]._id === userId){
                users.splice(u,1);
                res.sendStatus(200);
                return
            }
        }
        res.sendStatus(404).send("can't delete")
    };

    function createUser(req, res){
        var user = req.body;
        if (user.password != user.verifiedpassword){
            res.sendStatus(404).send("passwords are not same");
        }
        else {
            user._id = (new Date()).getTime().toString();
            users.push(user);
            res.json(user);
        }
    };


    function findUser(req,res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req,res);
        } else if(username){
            findUserByUsername(req,res);
        }
    };

    function findUserByUsername(req,res) {
        var user = users.find(function (u){
            return u.username == req.query.username;
        });
        if (user){
            res.json(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username);
        }
    };

    function updateUser(req,res) {
        var userId = req.params.userId;
        var newUser = req.body;
        for (var u in users) {
            if (users[u]._id == userId){
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                res.json(users[u]);
                return;
            }
        }
    };

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function(user){
            return user.password == password && user.username == username;
        });
        console.log(user);
        res.send(user);

    };

    function findUserById(req, res){
        var userId = req.params.userId;
        var user = users.find(function (u){
            return u._id == userId;
        });
        res.json(user);
    };

};
