const express = require("express")
const router  = express.Router()
const helpers = require("../helpers/helpers")

router.get("/channels",helpers.getChannel)

router.post("/channel1/:id/:cid",helpers.getInChannel1)

router.post("/channel2/:id/:cid",helpers.getInChannel2)

router.post("/channelClose/:id/:cid",helpers.closeChannel)

module.exports = router;