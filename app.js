var express = require("express");
var router = express.Router();
var fs = require("fs");
var _ = require("lodash");
app = express();

app.get("/books", function (req, res) {
  fs.readFile(__dirname + "/books.json", function (err, books) {
    if (err) {
      console.log(err);
    } else {
      res.end(books);
    }
  });
});

app.get("/books/id/:bookId", function (req, res) {
  bookId = req.params.bookId;
  _.lowerCase;
  fs.readFile(__dirname + "/books.json", function (err, data) {
    if (err) {
      console.log(err);
    } else if (bookId > 10) {
      res.end(JSON.stringify("{This book doesn't exist}"));
    } else {
      let dataJson = JSON.parse(data);
      //   console.log(dataJson);
      let book = dataJson["books"][bookId - 1];
      res.end(JSON.stringify(book));
    }
  });
});

app.get("/books/title/:title", function (req, res) {
  bookTitle = _.upperFirst(req.params.title);
  fs.readFile(__dirname + "/books.json", function (err, data) {
    if (err) {
      console.log(err);
    } else if (!bookTitle) {
      res.end(JSON.stringify("{This book title doesn't exist}"));
    } else {
      let dataJson = JSON.parse(data);
      let book = dataJson["books"];
      let arrBook = Object.entries(book).filter(
        (item) => item[1]["title"] === bookTitle
      );
      res.end(JSON.stringify(arrBook[0][1]));
    }
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));
