const express = require("express");

const app = express();

const port = process.env.PORT || 5000

app.get("/", (req: any, res: any) => {
    res.send("check back 333")
});

app.listen(port, () => {
    console.log(`app has startd on ${port} app`)
})
