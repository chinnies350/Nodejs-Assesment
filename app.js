require("dotenv").config()
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const FeedRouter = require("./api/Feed/feed.router");

app.use(express.json());  //to conver the javascript object to all the json

// app.get('/api', (req,res)=>{
//     res.json({
//         success:1,
//         message:"This is rest apis working"
//     });
// });

app.use("/api/users", userRouter);
app.use("/api/feed",FeedRouter);

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Server up and running");
});