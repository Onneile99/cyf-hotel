const SERVER_PORT = process.env.PORT || 8080;

const express = require("express");
const exphbs = require("express-handlebars");
// const bodyparser = require("body-parser");

// const apiRouter = require("./api");

const app = express();
// const router = express.Router();

const formidable = require("express-formidable");
app.use(formidable());

const dbFilename = 'data/hotel.sqlite';
const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database(dbFilename);

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.static("assets"));

// app.use("/api", apiRouter);

// handle HTTP POST requests
// app.use(bodyparser.json());

app.get("/", function (req, res, next) {
  res.render("home");
});

app.get("/customers", function(req, res) {
  db.all("SELECT name, email, phone, address, city " +
         "FROM customers", function (err, rows) {

    // rows.forEach(function (row) {
    //   console.log(row.name, row.email, row.phone,
    //               row.address, row.city);
    // });

// Line 50-52 same as 
    // res.status(200).json({ 
    //   customer:rows
    // })
    const myData={
    customer:rows
    };
    res.status(200).json(myData);
  });
});

app.get("/customers/:id", function(req, res) {
  var id = req.params.id;
  // we’ll add code here ...
  // console.log(`Hey customer number`)

  db.get("SELECT * FROM customers WHERE id = ?", [id],
    function (err, row){
  // we’ll add code here next ...

  // console.log("selected row!", err, row);

  res.status(200).json({
      customers:row
    })
});
});


app.listen(SERVER_PORT, () => {
  console.info(`Server started at http://localhost:${SERVER_PORT}`);
});
