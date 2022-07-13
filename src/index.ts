const express = require("express");

const app = express();

app.get("/", (req: any, res: any) => {
    res.send("check back 222")
});

app.listen(5000, () => {
    console.log("app has startd")
})
