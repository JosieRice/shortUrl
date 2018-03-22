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



function PasswordCheck(users) {
    let userKeys = [];

    userKeys = Object.keys(users);

    console.log(userKeys);

  // loops through users[index].email into ordered array of emails

  // loops through users[index].password into ordered array of passwords

  // Finds index of email, comespares that index to the index of password.



    // need a function that compares the email submitted to the database
  // get the password from that object and compare it to the
}

PasswordCheck(users);