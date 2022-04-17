const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
 
const app = express();

var items = ["Buy food", "Cook food", "Eat food"];
let workItems = [];
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public")); // telling express to serve our CSS file; all future static files can be put here & we can use them by decalring to express.


app.set("view engine", "ejs"); // tells our app which is generated using Express to use EJS as its view engine

app.get("/", function (req, res) {
    
    let day = date.getDate();   // calling the function that is bound to that date module

    res.render("list", {
        listTitle: day,
        newListItems: items
    });

    res.render("list", { // we're creating our response by rendering a file called list which has to be inside "views" folder & has extension ejs
        listTitle: day // into list we're passing in a single varible that has name listTitleDay & the value we're giving is value of our variable : day
    });
});


app.post("/", function (req, res) {
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/"); // when a post req is triggered on our home route we'll save value of new item in that txt box to a var 'item' & it'll redirect to home route which to above app.get  for home route & it'll res.render the list template passing both kindOfDay & newListItem
});



app.get("/work", function (req, res) {
    res.render("list", {
        listTitle: "Work List",
        newListItems: workItems
    });
});

app.post("/work", function (req, res) {

    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");

    } else {
        items.push(item);
        res.redirect("/");
    }



    workItems.push(item);
    res.redirect("/");
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function (req, res) {
    console.log("Server is running on port 3000.");
});



// switch (currentDay) {
//     case 0:
//         day = "Sunday";

//         break;
//     case 1:
//         day = "Monday";

//         break;
//     case 2:
//         day = "Tuesday";

//         break;
//     case 3:
//         day = "Wednesday";

//         break;
//     case 4:
//         day = "Thrusday";

//         break;
//     case 5:
//         day = "Friday";

//         break;
//     case 6:
//         day = "Saturday";

//         break;


//     default:
//         console.log("Error: current day is equal to : "+ currentDay);
//         break;
// }