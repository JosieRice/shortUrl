const users = { "userRandomID": {
                                  id: "userRandomID",
                                 email: "user@example.com",
                                 password: "purple-monkey-dinosaur"
                                 },
                "user2RandomID": {
                                 id: "user2RandomID",
                                email: "user2@example.com",
                                password: "dishwasher-funk"
                                }
                }




function findDuplicate (email) {
    let userKeys = [];
    let emailList = [];

    userKeys = Object.keys(users);

        for (var i = 0; i < userKeys.length; i++) {
            emailList.push(users[userKeys[i]].email);
        }

        for (var j = 0; j < emailList.length; j++) {
            if (email === emailList[j]) {
                return emailList[j];
            }
        }
};


findDuplicate('user2@example.com');
