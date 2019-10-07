const { Router } = require("express");
const router = Router();
const fs = require("fs"); // Guardar archivo
const uuid = require("uuid/v4");

// read file
const json_books = fs.readFileSync("src/books.json", "utf-8");
const books = JSON.parse(json_books);

router.get("/", (req, res) => {
  res.render("index.ejs", {
    books
  });
});

router.get("/new-entry", (req, res) => {
  res.render("new-entry");
});

router.post("/new-entry", (req, res) => {
  // console.log(req.body);
  const { title, author, image, description } = req.body;
  if (!title || !author || !description) {
    res.status(400).send("Entries must have a title adn description");
    return;
  }
  let newBook = {
    id: uuid(),
    title,
    author,
    image,
    description
  };

  books.push(newBook);

  const json_books = JSON.stringify(books);

  // write file
  fs.writeFileSync("src/books.json", json_books, "utf-8");

  res.redirect("/");

  res.send("received");
});

module.exports = router;
