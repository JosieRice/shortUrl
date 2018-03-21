var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(cookieParser());




var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString (object) {
  var shortUrl = "";
  var char = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";

  for (let i = 0; i < 6; i++) {
    shortUrl += char.charAt(Math.floor(Math.random() * char.length));
  }
  urlDatabase[shortUrl] = Object.values(object)[0];
  return shortUrl;
}

// Homepage
app.get("/", (req, res) => {
  res.end("Hello!");
});

// List of URL from Database
app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

// Enter a URL form
app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

// Post new url on submit and redirect to short version
app.post("/urls", (req, res) => {
  res.redirect("/urls/" + generateRandomString(req.body));
});

// Redirect the /u/ url to the original based on Database info
app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

// Single URL on a page.
app.get("/urls/:id", (req, res) => {

   let templateVars = { shortURL: req.params.id,
                        longURL: urlDatabase[req.params.id] }
  res.render("urls_show", templateVars);
});

// Removes a url resourcs
app.post("/urls/:id/delete", (req, res) => {
  let templateVars = {  shortURL: req.params.id,
                        urls: urlDatabase };
  delete urlDatabase[req.params.id];
  res.redirect("/urls", templateVars);
});

// Updates a long url
app.post("/urls/:id", (req, res) => {
  // let templateVars = { shortURL: req.params.id,
  //                       urls: urlDatabase };

  // delete urlDatabase[req.params.id];
  res.redirect("/urls");
});


// Login Route
app.post("/login", (req, res) => {

  res.cookie('username', req.body.username);
  // console.log('Cookies: ', req.body.username);
  res.redirect("/urls");
})











// Can go to this url to check database
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

// Starts server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});