// User Database
const users = {
  "userRandomID": {
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


function findDuplicateLoginPassword (email, password) {
  let userKeys = [];
  let emailList = [];
  let passwordList = [];

  userKeys = Object.keys(users);

  for (var i = 0; i < userKeys.length; i++) {
    emailList.push(users[userKeys[i]].email);
  }

  for (var p = 0; p < userKeys.length; p++) {
    passwordList.push(users[userKeys[p]].password);
  }

  let emailIndex = emailList.findIndex(emailList => emailList === email);

  if (email !== emailList[emailIndex] && password !== passwordList[emailIndex]) {
    console.log("EMAIL & Password MATCH")
  } else {
    console.log("error");
  }
}


// passing in req.body.email and req.body.password
findDuplicateLoginPassword('user2@example.com','purple-monkey-dinosaur');