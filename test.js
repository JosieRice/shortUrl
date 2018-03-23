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


function findEmailWithId (id) {
  // loops through object assigning id as the floating name of nested objects
  for (let i in users) {
    if (id === users[i].id) {
      // returns id in users that matches email put into function
      return users[i].email;
    }
  }
};

console.log(findEmailWithId('user2RandomID'));


function findIdWithEmail (email) {
  // loops through object assigning id as the floating name of nested objects
  for (let i in users) {
    if (email === users[i].email) {
      // returns users id that matches email put into function
      return users[i].id;
    }
  }
};

console.log(findIdWithEmail('user2@example.com'));




/*

Main function bugs


3 - on page that lists urls, edit button must make a GET
request to /urls/:id (it goes to delete right now)

4 - on urls/[shortUrl]  make sure update button
which makes a POST request to /urls/:id   ?? makes a post but where to redirect?
going to shortUrl, not userid this button doesn't work

5 - on urls/[shortUrl] - if user is not logged in, it sends an error message.
currently, logged out user can access this part

6 - on urls/[shortUrl] - logged in user should get an error if they visit a page
for a shortUrl they didn't make

7 - u/[shortUrl] should redirect to the full url if this shortUrl exists

8 - check if login sets a cookie?

9 - check if register sets a cookie.

10 - register or login with existing user creates a new user ID instance in database





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


