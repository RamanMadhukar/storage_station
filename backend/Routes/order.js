const express = require('express');
const router = express.Router();
const {data, search, pageCount} = require("../Controller/order")


router.get("/",data);
router.post("/", pageCount);






module.exports = router;