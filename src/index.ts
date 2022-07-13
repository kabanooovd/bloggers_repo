const express = require("express");

const app = express();

const props = process.env.PORT || 5000

app.get("/", (req: any, res: any) => {
    res.send("check back 222")
});

app.listen(5000, () => {
    console.log(`app has startd on ${props} app`)
})
