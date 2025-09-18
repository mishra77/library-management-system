const express = require("express");
// const {users} = require("./data/users.json");

const app = express();

const port = 4000;

//importing routes
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).send("library-management-system HOME PAGE :-)");
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);




// app.all(/.*/, (req,res) => {
//     res.status(500).send("not buitl yet");
// });

app.listen(port, () => {
    console.log(`server is up and running on - http://localhost:${port}`);
});