
<% if(user === undefined) { %>
  <a class="link" href="/login">Login</a><a class="link" href="/register">Register</a>
<% } else { %>


  <%= user  %>
    <a class="link" href="/logout">Logout</a>

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
  }
}

// getting into nested objects

// console.log(users);

// for (let id in users) {
//   console.log("user Email: ", users[id].email);
//   console.log("user ID : " , users[id].id);
// }


function findIdWithEmail (email) {
  // loops through object assigning id as the floating name of nested objects
  for (let id in users) {
    if (email === users[id].email) {
      // returns id in users that matches email put into function
      return users[id].id;
    }
  }
};

findIdWithEmail('user2@example.com');

// searches with either id or email for either id or email, with is known value
// for is what you're searching for
function SearchUserDB (with, for) {
  // loops through object assigning id as the floating name of nested objects
  for (let with in users) {
    if (for === users[with].for) {
      // returns id in users that matches email put into function
      return users[for].with;
    }
  }
};

Console.log(SearchUserDB('user2@example.com', id));






/*


~  [production] $ node
> const users = { fakeId: { id: 'fakeId', email: 'test@test.com'} }
undefined
> users
{ fakeId: { id: 'fakeId', email: 'test@test.com' } }

> for (let id in users) { console.log(id) }
fakeId
undefined
> users['fakeId2'] = { id: 'fakeId2', email: 'test2@test.com' }
{ id: 'fakeId2', email: 'test2@test.com' }
> users
{ fakeId: { id: 'fakeId', email: 'test@test.com' },
  fakeId2: { id: 'fakeId2', email: 'test2@test.com' } }
> for (let id in users) { console.log(id) }
fakeId
fakeId2
undefined
> for (let id in users) { console.log(users[id]) }
{ id: 'fakeId', email: 'test@test.com' }
{ id: 'fakeId2', email: 'test2@test.com' }
undefined
> Object.keys(users)
[ 'fakeId', 'fakeId2' ]
> var userKey = Object.keys(users)
undefined
> userKey
[ 'fakeId', 'fakeId2' ]
> for (let i = 0; i < userKey.length; i++) { console.log(i) }
0
1
undefined
> for (let i = 0; i < userKey.length; i++) { console.log(userKey[i]) }
fakeId
fakeId2
undefined
> function getIdForEmail(email) {
... for (let id in users) {
..... if (users[id].email === email) { return users[id] }
..... }
... }
undefined
> getIdForEmail('test@test.com')
{ id: 'fakeId', email: 'test@test.com' }
> getIdForEmail('test@test.com').id
'fakeId'
> var user = getIdForEmail('test@test.com')
undefined
> user
{ id: 'fakeId', email: 'test@test.com' }
> user.id
'fakeId'
> user.email
'test@test.com'
> function isAuthenticated(email, password) {}
undefined
>


*/

// tests that correct email is used on login

// function matchEmailtoPassword (email, password) {
//   let userKeys = [];
//   let emailList = [];
//   let passwordList = [];

//   userKeys = Object.keys(users);

//   for (var i = 0; i < userKeys.length; i++) {
//     emailList.push(users[userKeys[i]].email);
//   }

//   for (var p = 0; p < userKeys.length; p++) {
//     passwordList.push(users[userKeys[p]].password);
//   }

//   let emailIndex = emailList.findIndex(emailList => emailList === email);
//   if (email === emailList[emailIndex] && bcrypt.compareSync(password, passwordList[emailIndex]) === true) {
//     return true;
//   } else {
//     return false;
//   }
// }


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
  }
};



function verifyPasswordWithEmail (email, password) {
  let pwLookup = findPasswordWithEmail(email);
  if (bcrypt.compareSync(password, pwLookup) === true) {
    console.log("correc password");
    return true;
  } else {
    console.log("wrong password")
    return false;
  }
}

verifyPasswordWithEmail('user2@example.com', "dishwasher-funk");

verifyPasswordWithEmail('user2@example.com', "dishwasher");



function findIdWithEmail (email) {
  for (let i in users) {
    if (email === users[i].email) {
      return users[i].id;
    }
  }
}


function findPasswordWithEmail (email) {
  for (let i in users) {
    if (email === users[i].email) {
      return users[i].password;
    }
  }
}



/*


{ fakeId: { id: 'fakeId', email: 'test@test.com' },
  fakeId2: { id: 'fakeId2', email: 'test2@test.com' } }
> for (let id in users) { console.log(id) }
fakeId
fakeId2
undefined
> for (let id in users) { console.log(users[id]) }
{ id: 'fakeId', email: 'test@test.com' }
{ id: 'fakeId2', email: 'test2@test.com' }
undefined
> Object.keys(users)
[ 'fakeId', 'fakeId2' ]
> var userKey = Object.keys(users)
undefined
> userKey
[ 'fakeId', 'fakeId2' ]
> for (let i = 0; i < userKey.length; i++) { console.log(i) }
0
1
undefined
> for (let i = 0; i < userKey.length; i++) { console.log(userKey[i]) }
fakeId
fakeId2
undefined
> function getIdForEmail(email) {
... for (let id in users) {
..... if (users[id].email === email) { return users[id] }
..... }
... }
undefined
> getIdForEmail('test@test.com')
{ id: 'fakeId', email: 'test@test.com' }
> getIdForEmail('test@test.com').id
'fakeId'
> var user = getIdForEmail('test@test.com')
undefined
> user
{ id: 'fakeId', email: 'test@test.com' }
> user.id
'fakeId'
> user.email
'test@test.com'
> function isAuthenticated(email, password) {}
undefined
>



*/


/*

Extras




Clean up code

Correct variable declaration and semi-colon use

Proper and consistent indentation and spacing

Clear and consistent function and variable names

Modular and reusable code (no need to break your code into Node modules,
 but using helper functions to keep the code DRY is a good idea)

Well-commented code (in other words, that your code is easy to read)

That no debugging, commented-out or dead/un-used code is present

Sensible structure for the project's files and directories





Continue on

https://web.compass.lighthouselabs.ca/days/w02d4/activities/308


*/


