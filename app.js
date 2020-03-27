const express = require("express");
require('./db/mongoose')
const user = require('./models/user');
const userRouter = require('./router/User');


const app = express();

app.use(express.json());
app.use(userRouter);


app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});