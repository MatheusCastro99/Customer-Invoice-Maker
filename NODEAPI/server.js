const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("NODE API");
    req
});

app.listen(3000, () => {
    console.log("Node API running on port 3000");
});