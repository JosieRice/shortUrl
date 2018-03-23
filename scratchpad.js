
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