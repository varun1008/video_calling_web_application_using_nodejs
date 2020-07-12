const express = require("express")
const router  = express.Router()
const db = require("../models/db")

const helpers = require("../helpers/helpers")

router.get("/",helpers.index)

module.exports = router;