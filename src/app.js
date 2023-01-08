const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.port || 3000;


// pass path of html content
const static_path = path.join(__dirname,"../public");

// Connect with html file
app.use(express.static(static_path))


const partials_path = path.join(__dirname,"/templates/partials");

//set view engine
app.set("view engine","hbs");

// view  paths
const template_path = path.join(__dirname, "/templates/views");

//use views html
app.set("views", template_path);

//set partials
hbs.registerPartials(partials_path);


// routing app
app.get("", (request, response) => {
    response.render("index");
});

app.get("/about", (request, response) => {
    response.render("about");
});

app.get("/weather", (request, response) => {
    response.render("weather");
});

app.get("*", (request, response) => {
    response.render("404page", {errorMessage: 'Opps! Page Not Found'})
});

app.listen(port, () => {
    console.log(`listening server at port no. ${port}`);
});

