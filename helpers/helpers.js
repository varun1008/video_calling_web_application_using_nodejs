const db = require("../models/db")

exports.index = (req,res) =>{
    res.render("index")
}

exports.getChannel = (req,res) =>{
    db.channel.find()
    .then((data) => {
       res.json(data)
    })  
    .catch((err) =>{
        res.send(err)
    }) 
}

exports.getInChannel1 = (req,res) =>{
    var updateChannel = { $set : {"channels.$[channelFilter].u1" : false}};

    db.channel.findOneAndUpdate({"_id":req.params.id},updateChannel,{"arrayFilters":[{"channelFilter._id":req.params.cid}] , new : true})
    .then( channel =>{
        res.json(channel)
    })
    .catch((err) =>{
        res.send(err)
    })
}

exports.getInChannel2 = (req,res) =>{
    var updateChannel = { $set : {"channels.$[channelFilter].u2" : false}};

    db.channel.findOneAndUpdate({"_id":req.params.id},updateChannel,{"arrayFilters":[{"channelFilter._id":req.params.cid}] , new : true})
    .then( channel =>{
        res.json(channel)
    })
    .catch((err) =>{
        res.send(err)
    })
}

exports.closeChannel = (req,res) =>{
    var updateChannel = { $set : {"channels.$[channelFilter].u1" : true,
                                    "channels.$[channelFilter].u2" : true}};

    db.channel.findOneAndUpdate({"_id":req.params.id},updateChannel,{"arrayFilters":[{"channelFilter._id":req.params.cid}] , new : true})
    .then( channel =>{
        res.json(channel)
    })
    .catch((err) =>{
        res.send(err)
    })
}

module.exports = exports;