const express = require("express");

const app = express();

const port = 4000;

app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).send("library-management-system HOME PAGE :-)");
});

app.all(/.*/, (req,res) => {
    res.status(500).send("not buitl yet");
});

app.listen(port, () => {
    console.log(`server is up and running on - http://localhost:${port}`);
});