const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require("fs");

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", { title: "Home" })
})

app.get("/hover", (req, res) => {
  res.render("hover", { title: "Hover" })
})

app.get("/feedback", (req, res) => {
  res.render("feedback", { title: "Feedback" })
})

function saveForm(form, callback) {
  fs.writeFile("./form.json", JSON.stringify(form), callback); 
}

app.post("/feedback", (req, res) => {
  var form = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    subject: req.body.subject,
    msg: req.body.message
  };

  saveForm(form, function(err) {
    if (err) {
      res.status(404).send("Oops something went wrong!");
      return;
    }

    res.send("Feedback Saved!");
  });
})


app.get("/carousel", (req, res) => {
  res.render("carousel", { title: "Carousel" })
})

app.get("/supermarket", (req, res) => {
  res.render("supermarket", { title: "Supermarket" })
})

app.listen(3000, () => {
  console.log('server started');
});


