const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 8080; // default port 8080

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession( {
  secret: 'Hire Me! In a hole in the ground there lived a Hobbit.',
}));


// Databases in nested objects
const urlDatabase = {
  "b2xVn2": {
    userID: "userRandomID",
    shortUrl: "b2xVn2",
    longUrl: "http://www.lighthouselabs.ca"
  },
  "9sm5xK": {
    userID: "user2RandomID",
    shortUrl: "9sm5xK",
    longUrl: "http://www.google.com"
  }
};

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


// Functions

// returns a 6 character random string
function generateRandomString () {
  var shortUrl = "";
  // omitted I, O, l, 0, 1 to make string easier to dictate
  var char = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  for (let i = 0; i < 6; i++) {
    shortUrl += char.charAt(Math.floor(Math.random() * char.length));
  }
  return shortUrl;
}

// returns an ID from users database matched to email give as an argument
function findIdWithEmail (email) {
  for (let i in users) {
    if (email === users[i].email) {
      return users[i].id;
    }
  }
}

// returns an email from users database match to id given as an argument
function findEmailWithId (id) {
  for (let i in users) {
    if (id === users[i].id) {
      return users[i].email;
    }
  }
}

// return the long url from urlDatabase that matches the short Url given as argument
function findLongUrlWithShortUrl (id) {
  for (let i in urlDatabase) {
    if (id === urlDatabase[i].shortUrl) {
      return urlDatabase[i].longUrl;
    }
  }
}

// populates nested object for entry into urlDatabase
function urlDatabasePacking (ID, shortUrl, longUrl) {
  let newUrl = new Object();
    newUrl['userID'] = ID;
    newUrl['shortUrl'] = shortUrl;
    newUrl['longUrl'] = longUrl;
  urlDatabase[shortUrl] = newUrl;
}

// searches userDatabase for email in argument. If found returns email.
// if not found returns false
function findDuplicate (email) {
  for (let i in users) {
    if (email === users[i].email) {
      return users[i].email;
    }
  }
  return false;
}


// tests that correct email is used on login
function matchEmailtoPassword (email, password) {
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
  if (email === emailList[emailIndex] && bcrypt.compareSync(password, passwordList[emailIndex]) === true) {
    return true;
  } else {
    return false;
  }
}







// Homepage root redirect to urls
app.get("/", (req, res) => {
  res.redirect("/urls");
});

// Registration Page
app.get("/register", (req, res) => {
  let Vars = {  email: findEmailWithId(req.session.user_id), //****Keep Header
                shortUrl: req.params.id,
                longUrl: urlDatabase[req.params.id],
                user: req.session["user_id"]
                }
  res.render("register", Vars);
});

// Registration Post
app.post("/register", (req, res) => {
  // random string for cookie
  const randomUserId = generateRandomString();

  // creates newUser object with correct values
  let newUser = new Object();
    newUser['id'] = randomUserId;
    newUser['email'] = req.body.email;
    newUser['password'] = bcrypt.hashSync(req.body.password, 10);

  // puts new user object into global user object
  users[randomUserId] = newUser;

  // assigns cookie's user_id to it's randomly gen string

  // empty username or password returns error
  // if(!email || !password)
  if (req.body.email === "" || req.body.password === "" ) {
    res.status(400).send('400 Error, you must fill out the fields.');
  }

  // duplicate email returns error
  if (req.body.email === findDuplicate(req.body.email)) {
    res.status(400).send('That email already exists!')
  }
  // sends back to /urls after submit
  else {
    req.session.user_id = randomUserId;
    res.redirect("/urls");
  }
});

// Login Endpoint
app.get("/login", (req, res) => {
  let Vars = {  email: findEmailWithId(req.session.user_id), //Keep for header
                shortUrl: req.params.id,
                longUrl: urlDatabase[req.params.id],
                user: req.session.user_id
                }
  res.render("login", Vars);
});

// Login Route  IS BROKEN!!!  Grab user id for cookie as in slack notes
app.post("/login", (req, res) => {
  if (matchEmailtoPassword(req.body.email, req.body.password) === false) {
    res.status(403).send('There was a problem with your login')
  }
    // need to make the cookie go to the users id
    // res.cookie('user_id', req.cookies.user_id);
    // This session user_id needs to go to user id that matches email (req.body.email)




    req.session.user_id = findIdWithEmail(req.body.email); //Keep ****
    res.redirect("/");
});






// changing templateVars to Vars, adding in email vars for signed in email

// List of URL from Database
app.get("/urls", (req, res) => {
  // email is signed in users email
  let Vars =  {   email: findEmailWithId(req.session.user_id), //
                  shortUrl: req.params.id,
                  urls: urlDatabase,
                  user: req.session["user_id"]
                  };
  res.render("urls_index", Vars);
});

// Enter a URL form
app.get("/urls/new", (req, res) => {
  let templateVars = {  email: findEmailWithId(req.session.user_id),
                        urls: urlDatabase,
                        user: req.session["user_id"]
                        };
  if(req.session["user_id"] === undefined) {
    res.redirect('/login')
  }
  res.render("urls_new", templateVars);



});


// Post new url on submit and redirect to short version
app.post("/urls", (req, res) => {
  let templateVars = {  urls: urlDatabase,
                        user: req.session["user_id"]
                        };
const randomString = generateRandomString();
urlDatabasePacking(req.session["user_id"], randomString, req.body.longURL);
  res.redirect(`/urls/${randomString}`)
});

// redirect to long Url **** KEEP
app.get("/u/:shortUrl", (req, res) => {
 let longUrl = findLongUrlWithShortUrl(req.params.shortUrl);  //Keep ****
res.redirect(longUrl);
});

// Single URL on a page.
app.get("/urls/:id", (req, res) => {
   let Vars = { email: findEmailWithId(req.session.user_id), //KEEP ****
                shortUrl: req.params.id,   // works, keep
                longUrl: findLongUrlWithShortUrl(req.params.id),  // doesn't call any url
                user: req.session["user_id"] }

    // redirects unauthorized users to login page
    if (!req.session["user_id"]) {
      res.redirect("/login");
    }
    if (req.session["user_id"] !== urlDatabase[req.params.id].userID) {
      // res.redirect("/login");
      res.status(403).send('unauthorized access');
    } else {
      res.render("urls_show", Vars);
    }
});

// Removes a url resourcs
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});


// Updates a long url
app.post("/urls/:id", (req, res) => {
  // let templateVars = { shortURL: req.params.id,
  //                       urls: urlDatabase };

  // delete urlDatabase[req.params.id];
  res.redirect("/urls");
});


// Logout Route in process
app.post("/logout", (req, res) => {

  req.session = null;
  // console.log('Cookies: ', req.body.username);
  res.redirect("/urls");
});




// Can go to this url to check database
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/users.json", (req, res) => {
  res.json(users);
});





// Starts server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});