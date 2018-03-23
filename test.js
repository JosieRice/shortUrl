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



function findDuplicate (email) {
  for (let i in users) {
    if (email === users[i].email) {
      return users[i].email;
    }
  }
  return false;
}

console.log(findDuplicate('userasfsd@example.comcraig'));