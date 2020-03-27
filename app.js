const express = require("express");
require('./db/mongoose')
const user = require('./models/user');
const userRouter = require('./router/User');
const bookingRouter =require('./router/Booking');
const hallRouter = require('./router/Hall')
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(bookingRouter);
app.use(hallRouter);

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
});