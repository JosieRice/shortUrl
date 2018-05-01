const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 8080; // default port 8080

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession( {
  secret: 'Hire Me!',
}));

app.use(express.static(__dirname + "/public"));

// Local database
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
  let shortUrl = "";
  // omitted I, O, l, 0, 1 to make string easier to dictate
  let char = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
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
  let userKeys = [];
  let emailList = [];

  userKeys = Object.keys(users);

  for (var i = 0; i < userKeys.length - 1; i++) {
    emailList.push(users[userKeys[i]].email);
  }

  for (var j = 0; j < emailList.length; j++) {
    if (email === emailList[j]) {
      return emailList[j];
    }
  }
}

// Verifies encrypted password
function verifyPasswordWithEmail (email, password) {
  let pwLookup = findPasswordWithEmail(email);

  if (bcrypt.compareSync(password, pwLookup) === true) {
    return true;
  } else {
    return false;
  }
}

// finds password by email argument
function findPasswordWithEmail (email) {
  for (let i in users) {
    if (email === users[i].email) {
      return users[i].password;
    }
  }
}

// Start of routes

// Homepage root redirect to urls as main page
app.get("/", (req, res) => {
  res.redirect("/urls");
});

// Registration
app.get("/register", (req, res) => {
  let vars = {  email: findEmailWithId(req.session.user_id), //****Keep Header
    shortUrl: req.params.id,
    longUrl: urlDatabase[req.params.id],
    user: req.session["user_id"]
  }
  res.render("register", vars);
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

  // empty username or password returns error
  if (req.body.email === "" || req.body.password === "") {
    res.status(400).send('400 Error, you must fill out the fields.');
  }
  // duplicate email returns error
  if (req.body.email === findDuplicate(req.body.email)) {
    res.status(400).send('That email already exists!')
  }
  // assigns cookie's user_id to the random string generated on registration
  // and sends back to /urls after submit
  else {
    req.session.user_id = randomUserId;
    res.redirect("/urls/new");
  }
});

// Login
app.get("/login", (req, res) => {
  let vars = {  email: findEmailWithId(req.session.user_id), //Keep for header
    shortUrl: req.params.id,
    longUrl: urlDatabase[req.params.id],
    user: req.session.user_id
  }
  res.render("login", vars);
});

// Login Post
app.post("/login", (req, res) => {
  if (!verifyPasswordWithEmail(req.body.email, req.body.password)) {
    res.status(403).send('There was a problem with your login')
  }
  req.session.user_id = findIdWithEmail(req.body.email); //Keep ****
  res.redirect("/urls/new");
});

// URL's List Page
app.get("/urls", (req, res) => {
  // email is signed in users email
  let vars =  {   email: findEmailWithId(req.session.user_id), // KEEP ****
    shortUrl: req.params.id,
    urls: urlDatabase,
    user: req.session["user_id"]
  };
  res.render("urls_index", vars);
});

// URL's Post
app.post("/urls", (req, res) => {
  const randomString = generateRandomString();
  urlDatabasePacking(req.session["user_id"], randomString, req.body.longURL);
  res.redirect(`/urls/${randomString}`)
});

// Enter a URL To Shorten
app.get("/urls/new", (req, res) => {
  let templateVars = {  email: findEmailWithId(req.session.user_id),
    urls: urlDatabase,
    user: req.session["user_id"]
    };
  if(!req.session["user_id"]) {
    res.redirect('/login');
  }
  res.render("urls_new", templateVars);
});

// Redirect to long Url **** KEEP
app.get("/u/:shortUrl", (req, res) => {
 let longUrl = findLongUrlWithShortUrl(req.params.shortUrl);
res.redirect(longUrl);
});

// Single URL on a page.
app.get("/urls/:id", (req, res) => {
  let vars = { email: findEmailWithId(req.session.user_id),
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
      res.render("urls_show", vars);
    }
});

// Single URL Post
app.post("/urls/:id", (req, res) => {
  urlDatabase[req.params.id].longUrl = req.body.longUrl;
  res.redirect("/urls");
});

// Delete URL Post
app.post("/urls/:id/delete", (req, res) => {
  delete urlDatabase[req.params.id];
  res.redirect("/urls");
});

// Logout Route in process
// This should be a post, change when you make a tag links jquery
app.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

// Starts server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});