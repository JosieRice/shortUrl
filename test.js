const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "pass"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  },
  "user2RandomIDcraig": {
    id: "user2RandomIDcraig",
    email: "user2@example.comcraig",
    password: "dishwasher-funkcraig"
  }
};

// function findDuplicate (email) {
//   let userKeys = [];
//   let emailList = [];

//   userKeys = Object.keys(users);

//   for (var i = 0; i < userKeys.length - 1; i++) {
//     emailList.push(users[userKeys[i]].email);
//   }

//   for (var j = 0; j < emailList.length; j++) {
//     if (email === emailList[j]) {
//       return emailList[j];
//     }
//   }
// };

function findDuplicate (email) {

  for (var i = 0; i < users.length - 1; i++) {
    if (email === users[i].email) {
      console.log(usersI)
      return users[i].email;
    }
  }
  return false;
}


//   for (let i in users) {
//     if (email === users[i].email) {
//       return users[i].email;
//     }
//   }
//   return false;
// }

console.log(findDuplicate('user2@example.com'));



// urls to check database during Debugging
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/users.json", (req, res) => {
  res.json(users);
});
