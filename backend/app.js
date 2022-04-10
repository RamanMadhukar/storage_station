const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");





const app = express();



app.use(express.json());

app.use(cors());

mongoose.connect("mongodb://localhost:27017/testDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
        console.log("Database Connected");
    }).catch((e) => {
        console.log("database Not Connected",e);
    });




const orderRoutes = require("./Routes/order");



app.use(orderRoutes);







app.listen(5000, function () {
    console.log("server started at port 5000");
})
